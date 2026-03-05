import { Component, OnInit } from '@angular/core';
import { GenericTableComponent } from '../../../../shared/components/generic-table/generic-table.component/generic-table.component';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee';
import { EmployeeResponse } from '../../DTOs/EmployeeResponse';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog';
import { LoadingService } from '../../../../core/services/loading.service';
import { ToastService } from '../../../../shared/components/services/toast';
import { VoucherService } from '../../../vouchers/services/voucher';

@Component({
  standalone: true,
  selector: 'app-employee-list',
  imports: [
    CommonModule,
    GenericTableComponent,
    ConfirmDialogComponent
  ],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.scss',
})
export class EmployeeListComponent implements OnInit {
 
  showConfirm = false;
  employeeToDelete: any = null;

  constructor(
    private serviceEmployee: EmployeeService,
    private serviceVochers: VoucherService,
    private router: Router,
    private toast: ToastService) {}

    get employees$(): Observable<EmployeeResponse[]> {
      return this.serviceEmployee.employeesObs$; 
    }



    columns = [
      { key: 'employeeId', label: 'ID' },
      { key: 'firstName', label: 'Name' },
      { key: 'lastName', label: 'Last Name' },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Phone' },
      { key: 'hireDate', label: 'Hire Date' },
      { key: 'salary', label: 'Salary' } 
    ];



    ngOnInit() {
      this.serviceEmployee.load();
    } 


    onView(row: any) {  
      this.router.navigate(['/employees/view', row.employeeId]);
    }

    onCreate() {
      this.router.navigate(['/employees/create']);
    }

    onEdit(row: any) {
      this.router.navigate(['/employees', row.employeeId]);
    }

  
    onDelete(row: any) {
    const employeeId = row.employeeId;

      this.serviceVochers.getByEmployeeId(employeeId).subscribe(vouchers => {
        
        if (vouchers.length > 0) {
          this.toast.error('This employee has vouchers and cannot be deleted');
          return;
        }

        this.employeeToDelete = row;
        this.showConfirm = true;
      });
    }

    onConfirmDelete() {

      if (!this.employeeToDelete) return;

      this.serviceEmployee.delete(this.employeeToDelete.employeeId).subscribe(() => {

        this.toast.success('Employee deleted successfully');

        this.showConfirm = false;
        this.employeeToDelete = null;

        this.serviceEmployee.load(); 

      });

    }

    onCancelDelete() {
    this.showConfirm = false;
    this.employeeToDelete = null;
    }
}