import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { CoreMainComponent } from './core-main.component';
import { HeaderComponent } from './header/header.component';
import { TransferComponent } from './actions-comp/transfer/transfer.component';
import { AirtimeComponent } from './actions-comp/airtime/airtime.component';
import { DataComponent } from './actions-comp/data/data.component';
import { PayBillComponent } from './actions-comp/pay-bill/pay-bill.component';
import { WithdrawComponent } from './actions-comp/withdraw/withdraw.component';
import { DepositComponent } from './actions-comp/deposit/deposit.component';



export const coreMainRoutes: Routes = [
  {
    path: '',
    component: CoreMainComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'transaction',
        loadChildren: () =>
          import('./transaction/transaction.module').then(
            (m) => m.TransactionModule
          ),
      },
      {
        path: 'transfer',
        loadChildren: () =>
          import('./cards/cards.module').then(
            (m) => m.CardsModule
          ),
      },
    ]
  }, 
];

@NgModule({
  declarations: [    
    CoreMainComponent, HeaderComponent, TransferComponent, AirtimeComponent, DataComponent, PayBillComponent, WithdrawComponent, DepositComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(coreMainRoutes)
  ]
})

export class CoreMainModule { }
