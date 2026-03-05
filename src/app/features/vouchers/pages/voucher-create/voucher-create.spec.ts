import { ComponentFixture, TestBed } from '@angular/core/testing';

import {  VoucherCreateComponent } from './voucher-create';

describe('VoucherCreate', () => {
  let component: VoucherCreateComponent;
  let fixture: ComponentFixture<VoucherCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoucherCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoucherCreateComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
