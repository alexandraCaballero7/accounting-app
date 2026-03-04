import { Component } from '@angular/core';
import { GenericTableComponent } from '../../../../shared/components/generic-table/generic-table.component/generic-table.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-employee-list',
  imports: [
    CommonModule,
    GenericTableComponent,
  ],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.scss',
})
export class EmployeeListComponent {

 // constructor()

  employees = [
    { id: 1, name: 'Alexandra', email: 'alex@mail.com' },
    { id: 2, name: 'Carlos', email: 'carlos@mail.com' }
  ];

  columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' }
  ];

  onView(row: any) { console.log('view', row); }
  onEdit(row: any) { console.log('edit', row); }
  onDelete(row: any) { console.log('delete', row); }
  onCreate() { console.log('create'); }
}