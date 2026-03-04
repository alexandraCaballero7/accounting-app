import { Injectable } from '@angular/core';
import { VoucherResponse } from '../DTOs/VoucherResponse';
import { BehaviorSubject } from 'rxjs';
import { VoucherApiService } from './voucher-api';
import { VoucherRequest } from '../DTOs/VoucherRequest';

@Injectable()
export class VoucherService {
  private vouchers$ = new BehaviorSubject<VoucherResponse[]>([]);

  vouchersObs$ = this.vouchers$.asObservable();
  constructor(private voucherApi: VoucherApiService) {}

  load() {
    this.voucherApi.getAll().subscribe(data => this.vouchers$.next(data));
  }

  loadById(id: number) {
    this.voucherApi.getById(id).subscribe(data => this.vouchers$.next([data]));
  }

  loadByEmployeeId(employeeId: number) {
    this.voucherApi.getByEmployeeId(employeeId).subscribe(data => this.vouchers$.next(data));
  }

  create(dto: VoucherRequest) {
    this.voucherApi.create(dto).subscribe(() => this.load());
  }

  update(id: number, dto: VoucherRequest) {
    this.voucherApi.update(id, dto).subscribe(() => this.load());
  }

  delete(id: number) {
    this.voucherApi.delete(id).subscribe(() => this.load());
  }
}
