import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from '../../../../shared/components/generic-table/generic-table.component/generic-table.component';
import { VoucherService } from '../../services/voucher';
import { Observable } from 'rxjs';
import { VoucherResponse } from '../../DTOs/VoucherResponse';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog';
import { ToastService } from '../../../../shared/components/services/toast';

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
    private VoucherService: VoucherService,
     private router: Router,
     private toast: ToastService) {}
  
  get vouchers$(): Observable<VoucherResponse[]> {  
      return this.VoucherService.vouchersObs$; 
  }
  columns = [
    { key: 'voucherId', label: 'ID' },
    { key: 'voucherNumber', label: 'Voucher Code' },
    { key: 'description', label: 'Description' },
    { key: 'totalAmount', label: 'Amount' },
    { key: 'date', label: 'Date' },
  ];

  ngOnInit() {
    this.VoucherService.load();
  }

  onView(row: any) {    
    this.router.navigate(['/vouchers/view', row.voucherId]);
  }
  onEdit(row: any) {
    console.log('view', row)
    this.router.navigate(['/vouchers/edit', row.voucherId]);
  }


 onDelete(row: any) {
  this.voucherToDelete = row;
  this.showConfirm = true;
}

onConfirmDelete() {
  if(!this.voucherToDelete) return;

  this.VoucherService.delete(this.voucherToDelete.voucherId).subscribe(() => {
  this.toast.success('Employee deleted successfully');
  this.showConfirm = false;
  this.voucherToDelete = null;

  this.VoucherService.load();
  });
}

onCancelDelete() {
  this.showConfirm = false;
  this.voucherToDelete = null;
}
  onCreate() { this.router.navigate(['/vouchers/create']); }
}