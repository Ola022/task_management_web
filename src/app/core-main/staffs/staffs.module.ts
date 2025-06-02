import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffsComponent } from './staffs.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AddStaffDialogComponent } from './add-staff-dialog/add-staff-dialog.component';

export const staffsRoutes: Routes = [
  {
    path: '',
    component: StaffsComponent
  },
];

@NgModule({
  declarations: [StaffsComponent, AddStaffDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(staffsRoutes)
  ]
})

export class StaffsModule { }
