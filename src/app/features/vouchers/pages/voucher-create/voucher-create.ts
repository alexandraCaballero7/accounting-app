import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoucherForm } from '../../components/voucher-form/voucher-form'; 
import { VoucherItemsTable } from '../../components/voucher-items-table/voucher-items-table'; 

import { VoucherRequest, VoucherItemRequest } from '../../DTOs/VoucherRequest';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-voucher-create',
  imports: [
    CommonModule,
    VoucherForm,
    VoucherItemsTable
  ],
  templateUrl: './voucher-create.html',
  styleUrl: './voucher-create.scss',
})
export class VoucherCreateComponent {

  items: VoucherItemRequest[] = [];
  constructor(private router: Router) {}

  // normalmente esto vendría del API
  employees = [
    { id: 1, firstName: 'John', lastName: 'Doe' },
    { id: 2, firstName: 'Jane', lastName: 'Smith' },
    { id: 3, firstName: 'Carlos', lastName: 'Lopez' }
  ];

  voucherHeader: any = null;

  // agregar item
  addItem(item: VoucherItemRequest) {
    this.items.push(item);
  }

  // eliminar item
  deleteItem(index: number) {
    this.items.splice(index, 1);
  }

  // editar item
  editItem(item: VoucherItemRequest) {
    console.log('Edit item', item);
  }

  // total automático
  get totalAmount(): number {
    return this.items.reduce((sum, i) => sum + Number(i.amount), 0);
  }

  // submit final
  submitVoucher(header: any) {

    const payload: VoucherRequest = {
      ...header,
      totalAmount: this.totalAmount,
      Items: this.items
    };

   

    /**
     * Aquí normalmente llamarías al service
     * this.voucherService.createVoucher(payload)
     */
  }
  
  onCancel() {
       this.router.navigate(['/vouchers']);
  }
}