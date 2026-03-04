import { Injectable } from "@angular/core";
import { HttpService } from "../../../core/services/http.service";
import { environment } from "../../../environments/env";
import { EmployeeResponse } from "../DTOs/EmployeeResponse";
import { EmployeeRequest } from "../DTOs/EmployeeRequest";

@Injectable()
export class EmployeeApiService {
  private base = `${environment.apiUrl}/employees`;

  constructor(private http: HttpService) {}

  getAll() {
    return this.http.get<EmployeeResponse[]>(this.base);
  }

  getById(id: number) {
    return this.http.get<EmployeeResponse>(`${this.base}/${id}`);
  }

  create(dto: EmployeeRequest) {
    return this.http.post(this.base, dto);
  }

  update(id: number, dto: EmployeeRequest) {
    return this.http.put(`${this.base}/${id}`, dto);
  }

  delete(id: number) {
    return this.http.delete(`${this.base}/${id}`);
  }
}