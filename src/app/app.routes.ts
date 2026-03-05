import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'employees',
    pathMatch: 'full'
  },

  {
    path: 'employees',
    loadChildren: () =>
      import('./features/employees/employees-module')
        .then(m => m.EmployeesModule)
  },

  {
    path: 'vouchers',
    loadChildren: () =>
      import('./features/vouchers/vouchers-module')
        .then(m => m.VouchersModule)
  },

  {
    path: '**',
    redirectTo: 'employees'
  }
];