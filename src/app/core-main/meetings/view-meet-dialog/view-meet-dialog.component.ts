import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskConfirmDialogComponent } from '../../tasks/task-confirm-dialog/task-confirm-dialog.component';

@Component({
  selector: 'app-view-meet-dialog',
  templateUrl: './view-meet-dialog.component.html',
  styleUrl: './view-meet-dialog.component.scss'
})
export class ViewMeetDialogComponent {
  meeting = {
    title: '',
    organizer: '',
    participants: [] as string[],
    dateOnly: '',
    timeOnly: '',
    locationType: 'online',
    url: '',
    venue: '',
    agenda: '',
    status: 'Upcoming'
  };
  constructor(
    public dialogRef: MatDialogRef<TaskConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public MeetID: any,
  ) { }

  onCancel(): void {
    this.dialogRef.close();
  }
  
  ngOnInit(): void {
    if (this.MeetID > 0) {

      this.meeting = {
        title: 'Team Sync Meeting',
        organizer: 'Jane Doe',
        participants: ['Alex', 'Mary', 'John'],
        dateOnly: '15:30:00',
        timeOnly: '2025-06-01',
        agenda: 'Review project status and blockers.',
        locationType: 'online',
        url: 'https://meet.google.com/abc-defg',
        status: 'Upcoming',
        venue: 'Main Office, 3rd Floor' // used if offline
      };

    }
  }
}
