import { Component } from '@angular/core';
import { EmployeeRequest } from '../../DTOs/EmployeeRequest';
import { Router } from '@angular/router';
import { EmployeeFormComponent } from '../../components/employee-form/employee-form';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-employee-detail',
  imports:  [CommonModule, EmployeeFormComponent],
  templateUrl: './employee-detail.html',
  styleUrl: './employee-detail.scss',
})
export class EmployeeDetailComponent {

    constructor(private router: Router) {}

    updateEmployee(employee: EmployeeRequest) {
      console.log('Empleado actualizado:', employee);
    }
  
       onCancel() {
    this.router.navigate(['/employees']);
  }
}
