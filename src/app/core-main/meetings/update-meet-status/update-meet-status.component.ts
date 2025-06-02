import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-meet-status',
  templateUrl: './update-meet-status.component.html',
  styleUrl: './update-meet-status.component.scss'
})
export class UpdateMeetStatusComponent {
statuses: string[] = ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'];

  meeting = {
    title: 'Team Sync',
    status: 'Upcoming' // this would be dynamically bound
  };

  constructor(
    public dialogRef: MatDialogRef<UpdateMeetStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public MeetID: any,
  ) { }

  onCancel(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }
  
  save() {
    // API or service logic to update the meeting
    console.log('Status updated to:', this.meeting.status);
  }

}
