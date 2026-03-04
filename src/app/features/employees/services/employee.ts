import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { EmployeeApiService } from "./employee-api";
import {  EmployeeResponse } from "../DTOs/EmployeeResponse";
import { EmployeeRequest } from "../DTOs/EmployeeRequest";

@Injectable()
export class EmployeeService {
  private employees$ = new BehaviorSubject<EmployeeResponse[]>([]);

  employeesObs$ = this.employees$.asObservable();

  constructor(private api: EmployeeApiService) {}

  load() {
    this.api.getAll().subscribe(data => this.employees$.next(data));
  }

  loadById(id: number) {
    this.api.getById(id).subscribe(data => this.employees$.next([data]));
  }

  create(dto: EmployeeRequest) {
    this.api.create(dto).subscribe(() => this.load());
  }

  update(id: number, dto: EmployeeRequest) {
    this.api.update(id, dto).subscribe(() => this.load());
  }

  delete(id: number) {
    this.api.delete(id).subscribe(() => this.load());
  }

}