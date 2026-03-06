import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployeeListComponent } from './pages/employee-list/employee-list';     
import { EmployeeDetailComponent } from './pages/employee-detail/employee-detail';
import { EmployeeCreateComponent } from './pages/employee-create/employee-create';

const routes: Routes = [
  { path: '', component: EmployeeListComponent },
  { path: 'create', component: EmployeeCreateComponent }, 
  { path: 'edit/:id', component: EmployeeDetailComponent },
  { path: 'view/:id', component: EmployeeDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule {}