import { Component } from '@angular/core';
import { VoucherForm } from '../../components/voucher-form/voucher-form'; 
import { CommonModule } from '@angular/common';
import {  VoucherItemResponse } from '../../DTOs/VoucherResponse';
import { VoucherItemsTable } from '../../components/voucher-items-table/voucher-items-table';
import { Router } from '@angular/router';
import { VoucherItemRequest } from '../../DTOs/VoucherRequest';

@Component({
  standalone: true,
  selector: 'app-voucher-detail',
  imports: [CommonModule, VoucherForm, VoucherItemsTable],
  templateUrl: './voucher-detail.html',
  styleUrl: './voucher-detail.scss',
})
export class VoucherDetailComponent {

  items: VoucherItemRequest[] = [];
  constructor(private router: Router) {}
  
    employees = [
    { id: 1, firstName: 'John', lastName: 'Doe' },
    { id: 2, firstName: 'Jane', lastName: 'Smith' },
    { id: 3, firstName: 'Carlos', lastName: 'Lopez' }
  ];


  voucher:any;


  ngOnInit(){

    // Simulación de carga
    this.voucher = {
      voucherNumber:1001,
      employeeId:3,
      description:'Office expenses'
    };

  }

  // mapear VoucherRequestItem -> VoucherResponseItem
  addItem(item: VoucherItemRequest) {
    const newItem: VoucherItemResponse = {
      ...item,
      voucherItemId: 0 // Valor por defecto o null
    };
    this.items.push(newItem);
  }

   // editar item
    editItem(item: VoucherItemRequest) {
      console.log('Edit item', item);
    }

    // eliminar item
  deleteItem(index: number) {
    this.items.splice(index, 1);
  }

    // total automático
  get totalAmount(): number {
    return this.items.reduce((sum, i) => sum + Number(i.amount), 0);
  }


  updateVoucher(header:any){

    const voucher = {
      ...header,
      items:this.items
    };

    console.log("Update voucher", voucher);

  }

    onCancel() {
       this.router.navigate(['/vouchers']);
  }

}