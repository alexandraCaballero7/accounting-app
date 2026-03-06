import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from '../../../../shared/components/generic-table/generic-table.component/generic-table.component';
import { VoucherService } from '../../services/voucher';
import { map, Observable } from 'rxjs';
import { VoucherResponse } from '../../DTOs/VoucherResponse';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog';
import { ToastService } from '../../../../shared/components/services/toast';
import { ConfirmDialogService } from '../../../../shared/components/services/confirm-dialog';

@Component({
  standalone: true,
  selector: 'app-voucher-list',
  imports: [CommonModule, 
    GenericTableComponent],
  templateUrl: './voucher-list.html',
  styleUrls: ['./voucher-list.scss'],
})
export class VoucherListComponent implements OnInit {

 showConfirm = false;
 voucherToDelete: any = null;
  constructor(
    private VoucherService: VoucherService,
     private router: Router,
     private toast: ToastService,
     private confirmDialog: ConfirmDialogService) {}
  
  get vouchers$(): Observable<VoucherResponse[]> {  
      return this.VoucherService.vouchersObs$; 
  }
  get vouchersFormatted$(): Observable<any[]> {
    return this.VoucherService.vouchersObs$.pipe(
      map(vouchers =>
        vouchers.map(v => ({
          ...v,
          employeeName: `${v.employee.firstName} ${v.employee.lastName}`,
          date: new Date(v.date).toLocaleDateString()
        }))
      )
    );
  }
  
  columns = [
    { key: 'voucherNumber', label: 'Voucher Code' },
    { key: 'employeeName', label: 'Employee Name' },
    { key: 'description', label: 'Description' },
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

    this.confirmDialog.open(
    'Are you sure you want to delete this voucher?',
    () => {

      this.VoucherService.delete(row.voucherId).subscribe(() => {
        this.toast.success('Voucher deleted successfully');
        this.VoucherService.load();

      });

    }
  );
  }


  onCreate() { this.router.navigate(['/vouchers/create']); }
}