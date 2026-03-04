import { TestBed } from '@angular/core/testing';

import { VoucherCalculation } from './voucher-calculation';

describe('VoucherCalculation', () => {
  let service: VoucherCalculation;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoucherCalculation);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
