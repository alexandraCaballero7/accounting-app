import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherCreate } from './voucher-create';

describe('VoucherCreate', () => {
  let component: VoucherCreate;
  let fixture: ComponentFixture<VoucherCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoucherCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoucherCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
