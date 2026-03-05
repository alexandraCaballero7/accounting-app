import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeRequest } from '../../DTOs/EmployeeRequest';
import { Router } from '@angular/router';

@Component({
  selector: 'employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-form.html',
  styleUrls: ['./employee-form.scss']
})
export class EmployeeFormComponent {
  @Input() readonly = false; 
  @Input() employee?: EmployeeRequest; 
  @Output() submitForm = new EventEmitter<EmployeeRequest>();

  form: FormGroup;

  constructor(
    private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      hireDate: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnChanges() {
    if (this.employee) {
      this.form.patchValue(this.employee);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }


}