import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VoucherItemRequest } from '../../DTOs/VoucherRequest';
import { VoucherResponse } from '../../DTOs/VoucherResponse';

@Component({
  selector: 'app-voucher-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './voucher-form.html',
  styleUrl: './voucher-form.scss'
})
export class VoucherForm {
  @Input() readonly = false;
  @Input() voucher: VoucherResponse | null = null;
  @Input() employees:any[] = [];
  @Input() itemToEdit: VoucherItemRequest | null = null;
  @Output() addItem = new EventEmitter<any>();
  @Output() submitVoucher = new EventEmitter<any>();

  headerForm:FormGroup;
  itemForm:FormGroup;

  constructor(private fb:FormBuilder){

    this.headerForm = this.fb.group({
      voucherNumber:[null, Validators.required],
      employeeId:[null, Validators.required],
      description:['']
    });

    this.itemForm = this.fb.group({
      description:['', Validators.required],
      amount:[0, Validators.required],
      type:[0, Validators.required]
    });

  }

ngOnChanges() {

  if (this.voucher) {
    this.headerForm.patchValue({
      voucherNumber: this.voucher.voucherNumber,
      employeeId: this.voucher.employeeId,
      description: this.voucher.description
    });
  }

   if (this.readonly) {
    this.headerForm.disable();
    this.itemForm.disable();
  } else {
    this.headerForm.enable();
    this.itemForm.enable();
  }


  if (this.itemToEdit) {
    this.itemForm.patchValue(this.itemToEdit);

  } else {
    this.itemForm.reset({ amount: 0, type: 0, description: '' });
  }
}

addVoucherItem() {

  if (this.itemForm.valid) {

    let item: VoucherItemRequest = { ...this.itemForm.value };

    item.amount = Number(item.amount);
    item.type = Number(item.type);

    if (item.type === 1) {
      item.amount = -Math.abs(item.amount);
    }

    if (item.type === 0) {
      item.amount = Math.abs(item.amount);
    }

    this.addItem.emit(item);

    this.itemForm.reset({
      amount: 0,
      type: 0,
      description: ''
    });

    this.itemToEdit = null;
  }

}

  submit() {

  if (!this.headerForm.valid) {
    this.headerForm.markAllAsTouched();
    return;
  }

  const voucher = {
    ...this.headerForm.value,
    employeeId: Number(this.headerForm.value.employeeId)
  };

  this.submitVoucher.emit(voucher);

}

}