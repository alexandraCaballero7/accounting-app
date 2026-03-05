import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { EmployeeApiService } from "./employee-api";
import {  EmployeeResponse } from "../DTOs/EmployeeResponse";
import { EmployeeRequest } from "../DTOs/EmployeeRequest";

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employees$ = new BehaviorSubject<EmployeeResponse[]>([]);

 employeesObs$: Observable<EmployeeResponse[]> = this.employees$.asObservable();

  constructor(private api: EmployeeApiService) {}

  load() {
    this.api.getAll().subscribe(data => this.employees$.next(data));
  }

   getById(id: number) {
    return this.api.getById(id);
  }

  create(dto: EmployeeRequest) {
    return this.api.create(dto);
  }

  update(id: number, dto: EmployeeRequest) {
    return this.api.update(id, dto);
  }

  delete(id: number) {
    return this.api.delete(id);
  }

}