import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-voucher-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './voucher-form.html',
  styleUrl: './voucher-form.scss'
})
export class VoucherForm {

  @Input() employees:any[] = [];

  @Output() addItem = new EventEmitter<any>();
  @Output() submitVoucher = new EventEmitter<any>();

  headerForm:FormGroup;
  itemForm:FormGroup;

  constructor(private fb:FormBuilder){

    this.headerForm = this.fb.group({
      voucherNumber:[null, Validators.required],
      employeeId:['', Validators.required],
      description:['']
    });

    this.itemForm = this.fb.group({
      description:['', Validators.required],
      amount:[0, Validators.required],
      type:[1, Validators.required]
    });

  }

  addVoucherItem(){

    if(this.itemForm.valid){

      this.addItem.emit(this.itemForm.value);

      this.itemForm.reset({
        amount:0,
        type:1
      });

    }
  }

  submit(){

    if(this.headerForm.valid){

      this.submitVoucher.emit(this.headerForm.value);

    }else{
      this.headerForm.markAllAsTouched();
    }

  }

}