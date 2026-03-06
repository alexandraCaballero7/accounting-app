import { Component } from '@angular/core';
import { EmployeeRequest } from '../../DTOs/EmployeeRequest';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeFormComponent } from '../../components/employee-form/employee-form';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee';
import { ToastService } from '../../../../shared/components/services/toast';
import { GenericTableComponent } from '../../../../shared/components/generic-table/generic-table.component/generic-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VoucherResponse } from '../../../vouchers/DTOs/VoucherResponse';
import { VoucherService } from '../../../vouchers/services/voucher';
import { ConfirmDialogService } from '../../../../shared/components/services/confirm-dialog';

@Component({
  standalone: true,
  selector: 'app-employee-detail',
  imports:  [
    CommonModule, 
    EmployeeFormComponent, 
    ReactiveFormsModule, 
   GenericTableComponent],
  templateUrl: './employee-detail.html',
  styleUrl: './employee-detail.scss',
})
export class EmployeeDetailComponent {
    employee?: EmployeeRequest;
    vouchers: VoucherResponse[] = [];
    showConfirm = false;
    employeeToDelete: any = null;
    voucherToDelete: any = null;
    readonly = false;


    voucherColumns = [
  { key: 'voucherNumber', label: 'Voucher #' },
  { key: 'description', label: 'Description' },
  { key: 'totalAmount', label: 'Total Amount' },
  { key: 'createdAt', label: 'Date' }
];

    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private employeeService: EmployeeService,
      private voucherService: VoucherService,
      private confirmDialog: ConfirmDialogService,
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

        this.getVouchersByEmployeeId(id).subscribe(vouchers => {
          this.vouchers = vouchers;
        });
   }


    updateEmployee(employee: EmployeeRequest) {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.employeeService.update(id, employee).subscribe(() => {
        this.toast.success('Employee updated successfully');
        this.router.navigate(['/employees']);
     });
    }

     onEditEmployee() {
      this.router.navigate(['/employees/edit', this.route.snapshot.paramMap.get('id')]);
    }

    onDeleteEmployee() {
        const employeeId = Number(this.route.snapshot.paramMap.get('id'));
        this.voucherService.getByEmployeeId(employeeId).subscribe(vouchers => {
          
          if (vouchers.length > 0) {
            this.toast.error('This employee has vouchers and cannot be deleted');
            return;
          } 
           else  {   
      
              this.confirmDialog
              .open(`Are you sure you want to delete ${this.employee?.firstName}?`, () => {
              this.employeeService.delete(employeeId).subscribe(() => {
                  this.toast.success('Employee deleted successfully');
                  this.router.navigate(['/employees']);
                });
         }); } 
      });

    }

   

    onCancel() {
     this.router.navigate(['/employees']);
    }

      getVouchersByEmployeeId(id: number) {
      return this.voucherService.getByEmployeeId(id);
    }

    onViewVoucher(voucher:any){
      this.router.navigate(['/vouchers/view', voucher.voucherId]);
    }

    onEditVoucher(voucher:any){
      this.router.navigate(['/vouchers/edit', voucher.voucherId]);
    }

 
  onDeleteVoucher(voucher: any) {

  this.confirmDialog
    .open(`Are you sure you want to delete voucher #${voucher.voucherNumber}?`, () => {

        this.voucherService.delete(voucher.voucherId).subscribe(() => {
          this.toast.success('Voucher deleted successfully');
          this.voucherService.getByEmployeeId(Number(this.route.snapshot.paramMap.get('id'))).subscribe(vouchers => {
            this.vouchers = vouchers;
          });
        });

    });
  }
}
