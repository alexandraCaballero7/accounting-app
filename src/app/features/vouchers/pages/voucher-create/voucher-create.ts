import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoucherForm } from '../../components/voucher-form/voucher-form'; 
import { VoucherItemsTable } from '../../components/voucher-items-table/voucher-items-table'; 

import { VoucherRequest, VoucherItemRequest } from '../../DTOs/VoucherRequest';
import { Router } from '@angular/router';
import { VoucherService } from '../../services/voucher';
import { ToastService } from '../../../../shared/components/services/toast';
import { EmployeeService } from '../../../employees/services/employee';
import { EmployeeResponse } from '../../../employees/DTOs/EmployeeResponse';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-voucher-create',
  imports: [
    CommonModule,
    VoucherForm,
    VoucherItemsTable,
    
  ],
  templateUrl: './voucher-create.html',
  styleUrl: './voucher-create.scss',
})
export class VoucherCreateComponent implements OnInit {

  items: VoucherItemRequest[] = [];
  editingIndex: number | null = null;
  itemToEdit: VoucherItemRequest | null = null;
  voucherHeader: any = null;

  constructor(
    private router: Router,
    private voucerService: VoucherService,
    private employeeService: EmployeeService,
    private toast: ToastService
  ) {}

     get employees$(): Observable<EmployeeResponse[]> {
        return this.employeeService.employeesObs$; 
      }
     get totalAmount(): number {
        return this.items.reduce((sum, i) => sum + Number(i.amount), 0);
      }

      get totalDebits(): number {
      return this.items
        .filter(i => i.amount > 0)
        .reduce((sum, i) => sum + i.amount, 0);
     }

      get totalCredits(): number {
        return this.items
          .filter(i => i.amount < 0)
          .reduce((sum, i) => sum + Math.abs(i.amount), 0);
      }


  ngOnInit() {
      this.employeeService.load();
  }

addItem(item: VoucherItemRequest) {
  if (this.editingIndex !== null) {
    this.items[this.editingIndex] = item;  
    this.editingIndex = null;
  } else {
    this.items.push(item);                
  }
  this.itemToEdit = null;                 
}

deleteItem(index: number) {
    this.items.splice(index, 1);
}

editItem(item: VoucherItemRequest, index: number) {
  this.editingIndex = index;
  this.itemToEdit = { ...item }; 
}

 submitVoucher(voucher: VoucherRequest) {
    voucher.Items = this.items; 
    this.voucerService.create(voucher).subscribe(() => {
      this.toast.success('Voucher created successfully');
      this.router.navigate(['/vouchers']);
    });
  }
  
 onCancel() {
       this.router.navigate(['/vouchers']);
  }
}