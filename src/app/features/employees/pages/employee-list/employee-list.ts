import { Component, OnInit } from '@angular/core';
import { GenericTableComponent } from '../../../../shared/components/generic-table/generic-table.component/generic-table.component';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee';
import { EmployeeResponse } from '../../DTOs/EmployeeResponse';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog';
import { LoadingService } from '../../../../core/services/loading.service';

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
    private service: EmployeeService,
    private router: Router,
    private loadingService: LoadingService) {}

  get employees$(): Observable<EmployeeResponse[]> {
    return this.service.employeesObs$; // ya es Observable<EmployeeResponse[]>
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
   this.service.load();

  }


  onView(row: any) {  
    this.router.navigate(['/employees', row.employeeId]);
  }

  onCreate() {
    this.router.navigate(['/employees/create']);
  }

  onEdit(row: any) {
    this.router.navigate(['/employees', row.employeeId]);
  }

  onDelete(row: any) {
   this.employeeToDelete = row;
   this.showConfirm = true;
 }

  onConfirmDelete() {
   this.showConfirm = false;
   this.employeeToDelete = null;
  }

  onCancelDelete() {
  this.showConfirm = false;
  this.employeeToDelete = null;
  }
  

}