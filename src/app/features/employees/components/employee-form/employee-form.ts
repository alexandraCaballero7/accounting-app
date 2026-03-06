import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeRequest } from '../../DTOs/EmployeeRequest';
import { Router } from '@angular/router';
import { DateUtils } from '../../../../shared/utils/date-utils';

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
      department: ['', Validators.required],
      position: ['', Validators.required]
    });
  }

  ngOnChanges() {
      if (this.employee) {
    const employeeData = { ...this.employee };
    
    const hireDateString = this.employee.hireDate
      ? DateUtils.toDateInput(this.employee.hireDate)!
      : '';

    this.form.patchValue({
      ...employeeData,
      hireDate: hireDateString 
    });
  }
  }

  onSubmit() {
    if (this.form.valid) {
      const value = { ...this.form.value };
      value.hireDate = DateUtils.fromDateInput(value.hireDate)!;

      this.submitForm.emit(value);
    } else {
      this.form.markAllAsTouched();
    }
  }


}