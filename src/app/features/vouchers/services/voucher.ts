import { Injectable } from '@angular/core';
import { VoucherResponse } from '../DTOs/VoucherResponse';
import { BehaviorSubject, Observable } from 'rxjs';
import { VoucherApiService } from './voucher-api';
import { VoucherRequest } from '../DTOs/VoucherRequest';

@Injectable({
  providedIn: 'root',
})
export class VoucherService {
  private vouchers$ = new BehaviorSubject<VoucherResponse[]>([]);

  vouchersObs$:  Observable<VoucherResponse[]> = this.vouchers$.asObservable();
  constructor(private voucherApi: VoucherApiService) {}

  load() {
    this.voucherApi.getAll().subscribe(data => this.vouchers$.next(data));
  }

  getById(id: number) {
    return this.voucherApi.getById(id);
  }

  getByEmployeeId(employeeId: number) {
    return this.voucherApi.getByEmployeeId(employeeId);
  }

  create(dto: VoucherRequest) {
    return this.voucherApi.create(dto);
  }

  update(id: number, dto: VoucherRequest) {
    return this.voucherApi.update(id, dto);
  }

  delete(id: number) {
    return this.voucherApi.delete(id);
  }
}
