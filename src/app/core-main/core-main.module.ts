import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { CoreMainComponent } from './core-main.component';
import { HeaderComponent } from './header/header.component';
import { VConfirmationComponent } from './v-confirmation/v-confirmation.component';



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
         path: 'staffs',
         loadChildren: () =>
           import('./staffs/staffs.module').then(
             (m) => m.StaffsModule
           ),
     },
      {
         path: 'projects',
         loadChildren: () =>
           import('./tasks/tasks.module').then(
             (m) => m.TasksModule
           ),
     },
      {
         path: 'meetings',
         loadChildren: () =>
           import('./meetings/meetings.module').then(
             (m) => m.MeetingsModule
           ),
     },
      {
         path: 'events',
         loadChildren: () =>
           import('./events/events.module').then(
             (m) => m.EventsModule
           ),
     },
    ]
  }, 
];

@NgModule({
  declarations: [    
    CoreMainComponent, HeaderComponent, VConfirmationComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(coreMainRoutes)
  ]
})

export class CoreMainModule { }
