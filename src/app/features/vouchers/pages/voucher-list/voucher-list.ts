import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from '../../../../shared/components/generic-table/generic-table.component/generic-table.component';

@Component({
  standalone: true,
  selector: 'app-voucher-list',
  imports: [CommonModule, GenericTableComponent],
  templateUrl: './voucher-list.html',
  styleUrls: ['./voucher-list.scss'],
})
export class VoucherListComponent {
  vouchers = [
    { id: 1, code: 'VCH-001', amount: 120, date: '2026-03-03' },
    { id: 2, code: 'VCH-002', amount: 250, date: '2026-03-02' },
  ];

  columns = [
    { key: 'id', label: 'ID' },
    { key: 'code', label: 'Voucher Code' },
    { key: 'amount', label: 'Amount' },
    { key: 'date', label: 'Date' },
  ];

  onView(row: any) { console.log('view', row); }
  onEdit(row: any) { console.log('edit', row); }
  onDelete(row: any) { console.log('delete', row); }
  onCreate() { console.log('create'); }
}