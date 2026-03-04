import { TestBed } from '@angular/core/testing';

import { VoucherApi } from './voucher-api';

describe('VoucherApi', () => {
  let service: VoucherApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoucherApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
