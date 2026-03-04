import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherItemsTable } from './voucher-items-table';

describe('VoucherItemsTable', () => {
  let component: VoucherItemsTable;
  let fixture: ComponentFixture<VoucherItemsTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoucherItemsTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoucherItemsTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
