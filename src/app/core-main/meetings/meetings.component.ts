import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from '../../app.service';
import { ViewMeetDialogComponent } from './view-meet-dialog/view-meet-dialog.component';
import { UpdateMeetStatusComponent } from './update-meet-status/update-meet-status.component';
import { Constant } from '../../resources/constants';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrl: './meetings.component.scss'
})
export class MeetingsComponent {
  selected = 'all';
  selectedTab: 'All' | 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled' = 'All';
    meetings = [{
    title: '',
    organizer: '',
    participants: [] as string[],
    date: '',
    time: '',
    locationType: 'Online',
    url: '',
    venue: '',
    agenda: '',
    status: 'Upcoming',
    types: "meetings",
  }];
  //meeting = [] 
  // mmeetings = [];
  selectedDate: any;
  openSideNav: boolean = false;
  isSaved: boolean = false
  selectedMeetsID: number = 0;
  openCommentSideNav: boolean = false;
  userInfo: any;
  userId!: number;
  loadingSpinner: boolean = true;
  errorMessage: string = '';

    constructor(
      private app: AppService,
      private dialog: MatDialog,
  
    ) {
      this.userInfo = this.app.getFromStore(Constant.USER_INFO);
      this.userId = this.userInfo.id
    }
    

  ngOnInit(): void {
    this.getAllMeetings()
  }
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

  getAllMeetings() {
      this.errorMessage = '';
      this.app.coreMainService.getAllMeetings(this.userId)
        .subscribe({
          next: (res: any) => {
            this.loadingSpinner = false;
            if (res['message'] == Constant.SUCCESS) {
              this.meetings = res['data'].meetings.reverse() || [];
              if (this.meetings.length === 0) {
                this.errorMessage = 'No meetings found.';
              }  
              
            } else {
              this.meetings = [];
              this.errorMessage = res['data'];
            }
          },
          error: (error) => {
            this.loadingSpinner = false;
            this.errorMessage = Constant.ERROR_MSG;
          }
        });
    }

  closeAddMeetNav(){
    this.openSideNav = false;
    this.selectedMeetsID = 0; // Reset the selected task ID        
  }
  closeRefreshMeetNav() {
      this.openSideNav = false
      this.selectedMeetsID = 0; // Reset the selected task ID
      this.getAllMeetings()    
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
    let id = meet
    const dialogRef = this.dialog.open(ViewMeetDialogComponent, {
      width: '1200px',
      data: meet
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Perform an action like checking balance
        //this.checkBalance();
      }
    });
  }


  openUpdateStatusDialog(meet: any, action: string) {
    let id = meet?.id
    let status = meet?.status
    
    const dialogRef = this.dialog.open(UpdateMeetStatusComponent, {
      width: '400px',
      data: {meetId: id, status: status, userID: this.userId, action:action}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAllMeetings()
      }
    });
  }
}
