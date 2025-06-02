import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingsComponent } from './meetings.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AddMeetsComponent } from './add-meets/add-meets.component';
import { ViewMeetDialogComponent } from './view-meet-dialog/view-meet-dialog.component';
import { UpdateMeetStatusComponent } from './update-meet-status/update-meet-status.component';

export const meetingsRoutes: Routes = [
  {
    path: '',
    component: MeetingsComponent
  },
];


@NgModule({
  declarations: [
    MeetingsComponent,
    AddMeetsComponent,
    ViewMeetDialogComponent,
    UpdateMeetStatusComponent,
    
  ],
  imports: [
    CommonModule,    
    SharedModule,
    RouterModule.forChild(meetingsRoutes)
  ]
})
export class MeetingsModule { }
