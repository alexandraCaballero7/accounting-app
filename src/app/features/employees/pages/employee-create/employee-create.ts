import { Component } from '@angular/core';
import { EmployeeRequest } from '../../DTOs/EmployeeRequest';
import { EmployeeFormComponent } from '../../components/employee-form/employee-form';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee';
import { ToastService } from '../../../../shared/components/services/toast';

@Component({
  standalone: true,
  selector: 'app-employee-create',
  imports: [CommonModule, EmployeeFormComponent],
  templateUrl: './employee-create.html',
  styleUrl: './employee-create.scss',
})
export class EmployeeCreateComponent {

  constructor(
     private router: Router, 
     private employeeService: EmployeeService,
     private toast: ToastService
  ) {}

 
onSubmit(employee: EmployeeRequest) {
  this.employeeService.create(employee).subscribe(() => {
    this.toast.success('Employee created successfully');
    this.router.navigate(['/employees']);
  });
}

  onCancel() {
  this.router.navigate(['/employees']);
 }
}
