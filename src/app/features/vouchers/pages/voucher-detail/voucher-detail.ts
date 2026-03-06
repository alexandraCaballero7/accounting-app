import { Component } from '@angular/core';
import { VoucherForm } from '../../components/voucher-form/voucher-form'; 
import { CommonModule } from '@angular/common';
import {  VoucherItemResponse, VoucherResponse } from '../../DTOs/VoucherResponse';
import { VoucherItemsTable } from '../../components/voucher-items-table/voucher-items-table';
import { ActivatedRoute, Router } from '@angular/router';
import { VoucherItemRequest, VoucherRequest } from '../../DTOs/VoucherRequest';
import { VoucherService } from '../../services/voucher';
import { ToastService } from '../../../../shared/components/services/toast';
import { EmployeeService } from '../../../employees/services/employee';
import { EmployeeResponse } from '../../../employees/DTOs/EmployeeResponse';
import { Observable } from 'rxjs';
import { ConfirmDialogService } from '../../../../shared/components/services/confirm-dialog';

@Component({
  standalone: true,
  selector: 'app-voucher-detail',
  imports: [CommonModule, VoucherForm, VoucherItemsTable],
  templateUrl: './voucher-detail.html',
  styleUrl: './voucher-detail.scss',
})
export class VoucherDetailComponent {

  items: VoucherItemRequest[] = [];
  editingIndex: number | null = null;
  itemToEdit: VoucherItemRequest | null = null;
  voucher: VoucherResponse | null = null;
  readonly = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private voucherService: VoucherService,
    private employeeService: EmployeeService,
    private toast: ToastService,
    private confirmDialog: ConfirmDialogService) {}
  
       get employees$(): Observable<EmployeeResponse[]> {
          return this.employeeService.employeesObs$; 
        }


  


  ngOnInit(){
      this.employeeService.load();

      const id = Number(this.route.snapshot.paramMap.get('id'));
      const isView = this.route.snapshot.url.some(segment => segment.path === 'view');

      this.readonly = isView;

      this.voucherService.getById(id).subscribe(voucher => {
        this.voucher = voucher;
        this.items = voucher.items.map((i: any) => ({
          description: i.description,
          amount: i.amount,
          type: i.amount < 0 ? 1 : 0, // deducir tipo por el signo del monto
          voucherItemId: i.voucherItemId
        }));
      });


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

  editItem(event: { item: VoucherItemRequest, index: number }) {

  this.editingIndex = event.index;
  this.itemToEdit = { ...event.item };

}
   
  deleteItem(index: number) {
    this.items.splice(index, 1);
  }

  
  get totalAmount(): number {
    return this.items.reduce((sum, i) => sum + Number(i.amount), 0);
  }


updateVoucher(voucher: VoucherRequest) {

  const id = Number(this.route.snapshot.paramMap.get('id'));

  const payload: VoucherRequest = {
    ...voucher,
    Items: this.items
  };

  this.voucherService.update(id, payload).subscribe(() => {

    this.toast.success('Voucher updated successfully');
    this.router.navigate(['/vouchers']);

  });

}


onEditVoucher() {
 this.router.navigate(['/vouchers/edit', this.route.snapshot.paramMap.get('id')]);
}

 onDeleteVoucher() {
  const voucherId = Number(this.route.snapshot.paramMap.get('id'));
  this.confirmDialog
    .open(`Are you sure you want to delete voucher #${this.voucher?.voucherNumber}?`, () => {

        this.voucherService.delete(voucherId).subscribe(() => {
          this.toast.success('Voucher deleted successfully');
          this.router.navigate(['/vouchers']);
        });

    });
  }

  onCancel() {
       this.router.navigate(['/vouchers']);
  }

}