import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

export const eventsRoutes: Routes = [
  {
    path: '',
    component: EventsComponent
  },
];

@NgModule({
  declarations: [
    EventsComponent
  ],
  imports: [
    CommonModule,    
    SharedModule,
    RouterModule.forChild(eventsRoutes)
  ]
})
export class EventsModule { }
