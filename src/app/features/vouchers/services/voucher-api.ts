import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpService } from '../../../core/services/http.service';
import { VoucherRequest } from '../DTOs/VoucherRequest';
import { VoucherResponse } from '../DTOs/VoucherResponse';

@Injectable({
  providedIn: 'root',
})
export class VoucherApiService {
  private base = `${environment.apiUrl}/Vouchers`;

  constructor(private http: HttpService) {}

  getAll() {
    return this.http.get<VoucherResponse[]>(this.base);
 }

  getById(id: number) {
    return this.http.get<VoucherResponse>(`${this.base}/${id}`);
  }

  getByEmployeeId(employeeId: number) {
    return this.http.get<VoucherResponse[]>(`${this.base}/Employee/${employeeId}`);
  }

  create(dto: VoucherRequest) {
    return this.http.post(this.base, dto);
  }

  update(id: number, dto: VoucherRequest) {
    return this.http.put(`${this.base}/${id}`, dto);
  }
  delete(id: number) {
    return this.http.delete(`${this.base}/${id}`);
  }
}
