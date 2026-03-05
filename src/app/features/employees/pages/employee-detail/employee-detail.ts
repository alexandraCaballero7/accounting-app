import { Component } from '@angular/core';
import { EmployeeRequest } from '../../DTOs/EmployeeRequest';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeFormComponent } from '../../components/employee-form/employee-form';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee';
import { ToastService } from '../../../../shared/components/services/toast';

@Component({
  standalone: true,
  selector: 'app-employee-detail',
  imports:  [CommonModule, EmployeeFormComponent],
  templateUrl: './employee-detail.html',
  styleUrl: './employee-detail.scss',
})
export class EmployeeDetailComponent {
    employee?: EmployeeRequest;
    readonly = false;

    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private employeeService: EmployeeService,
      private toast: ToastService
    ) {}

   ngOnInit() {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        const isView = this.route.snapshot.url.some(segment => segment.path === 'view');

         this.readonly = isView;

        this.employeeService.getById(id).subscribe(employee => {

        this.employee = {
          firstName: employee.firstName,
          lastName: employee.lastName,
          email: employee.email,
          phone: employee.phone,
          hireDate: employee.hireDate,
          salary: employee.salary
        };

      });
   }

   getEmployeeById() {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      return this.employeeService.getById(id);
    }
    updateEmployee(employee: EmployeeRequest) {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.employeeService.update(id, employee).subscribe(() => {
        this.toast.success('Employee updated successfully');
        this.router.navigate(['/employees']);
     });
    }
  
   onCancel() {
    this.router.navigate(['/employees']);
  }
}
