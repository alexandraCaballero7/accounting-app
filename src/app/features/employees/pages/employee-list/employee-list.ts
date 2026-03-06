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
import { ConfirmDialogService } from '../../../../shared/components/services/confirm-dialog';

@Component({
  standalone: true,
  selector: 'app-employee-list',
  imports: [
    CommonModule,
    GenericTableComponent
  ],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.scss',
})
export class EmployeeListComponent implements OnInit {
 

  constructor(
    private serviceEmployee: EmployeeService,
    private serviceVochers: VoucherService,
      private confirmDialog: ConfirmDialogService,
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
      this.router.navigate(['/employees/edit', row.employeeId]);
    }

  


    onDelete(row: any) {

     this.serviceVochers.getByEmployeeId(row.employeeId).subscribe(vouchers => {
          
          if (vouchers.length > 0) {
            this.toast.error('This employee has vouchers and cannot be deleted');
            return;
          } 
          else  {
             this.confirmDialog
              .open(`Are you sure you want to delete ${row.firstName}?`,
              () => {

                this.serviceEmployee.delete(row.employeeId).subscribe(() => {
                    this.toast.success('Employee deleted successfully');
                    this.serviceEmployee.load();
                    
                  });  

              });
           }


      });
    }
  
}