import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsComponent } from './cards.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';


export const cardsRoutes: Routes = [
  {
    path: '',
    component: CardsComponent
  },
];


@NgModule({
  declarations: [
    CardsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(cardsRoutes)
  ]
})

export class CardsModule { }
