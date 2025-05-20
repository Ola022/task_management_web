import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionComponent } from './transaction.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';


export const transactionRoutes: Routes = [
  {
    path: '',
    component: TransactionComponent
  },
];

@NgModule({
  declarations: [
    TransactionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(transactionRoutes)
  ]
})
export class TransactionModule { }
