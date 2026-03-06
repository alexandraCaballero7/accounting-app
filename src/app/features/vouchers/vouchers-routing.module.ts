import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VoucherListComponent } from './pages/voucher-list/voucher-list';     
import { VoucherDetailComponent } from './pages/voucher-detail/voucher-detail'; 
import { VoucherCreateComponent } from './pages/voucher-create/voucher-create'; 

const routes: Routes = [
  { path: '', component: VoucherListComponent },
  { path: 'create', component: VoucherCreateComponent },
  { path: 'edit/:id', component: VoucherDetailComponent },
   { path: 'view/:id', component: VoucherDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VouchersRoutingModule {}