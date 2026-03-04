import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherDetail } from './voucher-detail';

describe('VoucherDetail', () => {
  let component: VoucherDetail;
  let fixture: ComponentFixture<VoucherDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoucherDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoucherDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
