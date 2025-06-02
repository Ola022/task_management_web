import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from '../../app.service';
import { TaskConfirmDialogComponent } from '../tasks/task-confirm-dialog/task-confirm-dialog.component';
import { ViewMeetDialogComponent } from './view-meet-dialog/view-meet-dialog.component';
import { UpdateMeetStatusComponent } from './update-meet-status/update-meet-status.component';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrl: './meetings.component.scss'
})
export class MeetingsComponent {
  selected = 'all';
  selectedTab: 'All' | 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled' = 'All';

  meetings = [
      {
        id: 2,
      title: 'Team Standup',
      organizer: 'Jane Doe',
      participants: ['Alex', 'Mary', 'John'],
      date: '2025-03-30T15:30:00',
      agenda: 'Review tasks and blockers.',
      locationType: 'online',
      url: 'https://meet.google.com/abc-defg',
      status: 'Ongoing'
    },
    {
        id: 2,
      title: 'Product Demo',
      agenda: 'Walkthrough for stakeholders',
      organizer: 'Jane Doe',
      participants: ['Sarah', 'Michael', 'David'],
      date: '2025-03-30T15:30:00',
      locationType: 'online',
      type: 'online',
      url: 'https://meet.google.com/xyz-demo',
      venue: '',
      status: 'Upcoming'
    }, {
        id: 2,
      title: 'Design Sync',
      organizer: 'Tom',
      participants: ['Sarah', 'Victor'],
      date: '2025-03-31T10:00:00',
      agenda: 'Discuss new UI/UX plans.',
      locationType: 'offline',
      venue: 'Main Hall',
      status: 'Upcoming'
    },
    {
        id: 2,
      title: 'Sprint Retrospective',
      organizer: 'Aisha',
      participants: ['Team A'],
      date: '2025-03-25T12:00:00',
      agenda: 'Review what went well and improvements.',
      locationType: 'online',
      url: 'https://zoom.com/retro',
      status: 'Completed'
    },
  ];
  selectedDate: any;
  openSideNav: boolean = false;
  selectedMeetsID: number = 0;
  openCommentSideNav: boolean = false;

  constructor(
    private app: AppService,
    private dialog: MatDialog,

  ) {}
  filteredMeetig(status: string) {
    return this.meetings.filter(m => m.status === status);
  }
  filteredMeetins(status: string) {
    if (status === 'all') return this.meetings;
    return this.meetings.filter(m => m.status.toLowerCase() === status.toLowerCase());
  }
  
  filteredMeeting() {
    if (this.selectedTab === 'All') return this.meetings;
    return this.meetings.filter(m => m.status === this.selectedTab);
  }
  get filteredMeetings() {
    return this.meetings.filter(meeting => {
      const matchTab = this.selectedTab === 'All' || meeting.status === this.selectedTab;
      const matchDate = !this.selectedDate || meeting.date === this.selectedDate;
      return matchTab && matchDate;
    });
  }
  

  closeAddMeetNav() {
    this.openSideNav = false
  }
  openAddMeetNav() {
    this.selectedMeetsID = 0
    this.openSideNav = true 
  }

  editMeet(meet: any) {
    this.selectedMeetsID = meet.id; // Set the selected task ID
    this.openSideNav = true; // Open the side navigation
  }

  closeCommentSidenav() {
    this.openCommentSideNav = false
  }

  openComment(meet: any) {
    this.selectedMeetsID = meet.id; // Set the selected task ID
    this.openCommentSideNav = true; // Open the side navigation
  }

  openViewDialog(meet: any) {
      let id  = meet?.id
      const dialogRef = this.dialog.open(ViewMeetDialogComponent, {
        width: '1200px',
        data: id 
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          // Perform an action like checking balance
          //this.checkBalance();
        }
      });
    }

    
  openUpdateStatusDialog(task: any) {
      let id  = task?.id
      const dialogRef = this.dialog.open(UpdateMeetStatusComponent, {
        width: '400px',
        data: id 
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          // Perform an action like checking balance
          //this.checkBalance();
        }
      });
    }
}
