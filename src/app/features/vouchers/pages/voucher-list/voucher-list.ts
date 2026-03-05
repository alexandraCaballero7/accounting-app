import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from '../../../../shared/components/generic-table/generic-table.component/generic-table.component';
import { VoucherService } from '../../services/voucher';
import { Observable } from 'rxjs';
import { VoucherResponse } from '../../DTOs/VoucherResponse';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog';

@Component({
  standalone: true,
  selector: 'app-voucher-list',
  imports: [CommonModule, 
    GenericTableComponent,
    ConfirmDialogComponent],
  templateUrl: './voucher-list.html',
  styleUrls: ['./voucher-list.scss'],
})
export class VoucherListComponent implements OnInit {

 showConfirm = false;
 voucherToDelete: any = null;
  constructor(
    private service: VoucherService,
     private router: Router) {}
  
  get vouchers$(): Observable<VoucherResponse[]> {  
      return this.service.vouchersObs$; // ya es Observable<VoucherResponse[]>
  }
  columns = [
    { key: 'voucherId', label: 'ID' },
    { key: 'voucherNumber', label: 'Voucher Code' },
    { key: 'description', label: 'Description' },
    { key: 'totalAmount', label: 'Amount' },
    { key: 'date', label: 'Date' },
  ];

  ngOnInit() {
    this.service.load();
  }

  onView(row: any) {    
     console.log('view', row)
    this.router.navigate(['/vouchers', row.voucherId]);
  }
  onEdit(row: any) {
    console.log('view', row)
    this.router.navigate(['/vouchers', row.voucherId]);
  }
    onDelete(row: any) {
  this.voucherToDelete = row;
  this.showConfirm = true;
}

onConfirmDelete() {
  console.log('delete', this.voucherToDelete);
  this.showConfirm = false;
  this.voucherToDelete = null;
}

onCancelDelete() {
  this.showConfirm = false;
  this.voucherToDelete = null;
}
  onCreate() { this.router.navigate(['/vouchers/create']); }
}