import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppService } from '../../../app.service';
import { Constant } from '../../../resources/constants';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-meets',
  templateUrl: './add-meets.component.html',
  styleUrl: './add-meets.component.scss'
})
export class AddMeetsComponent {

  meeting = {
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
  };

  taskTitle: string = 'Schedule Meeting'; // Default task title
  action: string = 'Save'; // Default action is Add Task 
  isEditable: boolean = true
  errorMessage: string = '';
  successMessage: string = '';
  loadingSpinner: boolean = false;
  userInfo: any;
  userId!: number

  constructor(private app: AppService, private dialog: MatDialog) {
    this.userInfo = this.app.getFromStore(Constant.USER_INFO);
    this.userId = this.userInfo.id
  }
  @Input() MeetID: number = 0;  // receives from parent
  @Output() public closeMeet: EventEmitter<any> = new EventEmitter<any>()
  @Output() public closeRefreshMeet: EventEmitter<any> = new EventEmitter<any>()



  ngOnInit(): void {
    this.getAllUsers()
    if (this.MeetID > 0) {
      this.taskTitle = 'Edit Meet'; // Change title if taskID is provided
      this.action = 'Save Changes'; // Change action to Edit      

      this.getMeetingDetail();
    }
    console.log(this.MeetID, this.isEditable)

  }

  closeComment() {
    this.closeMeet.emit()
  }
  users: any[] = [];
  allSelected = false;

  toggleAllSelection() {
    if (this.allSelected) {
      this.meeting.participants = [];
    } else {
      this.meeting.participants = [...this.users];
    }
    this.allSelected = !this.allSelected;
  }

  getFirstName(user: any): string {
    return user.title + ' ' + user.full_name.split(' ')[0];
  }

  toggleSelectAll() {
    this.allSelected = this.meeting.participants.length === this.users.length;
  }

  combineDateAndTime(date: string, time: string): string {
    return `${date}T${time}`;
  }

  submitMeeting(): void {
    if (!this.meeting.title || !this.meeting.date || !this.meeting.time) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }
    if (this.meeting.participants.length === 0) {
      this.errorMessage = 'Please select at least one participant.';
      return;
    }
    if (this.MeetID <= 0) {
      this.meeting.participants = this.meeting.participants.map(String);
      this.loadingSpinner = true;
      this.errorMessage = '';
      this.app.coreMainService
        .createMeeting(this.userId, this.meeting).subscribe({
          next: (res: any) => {
            this.loadingSpinner = false;
            if (res['message'] == Constant.SUCCESS) {
              this.app.snackbar.open(res['message'], 'Close', { duration: 3000 });
              this.closeRefreshMeet.emit();
            } else {
              this.errorMessage = res['data'].error || 'Something went wrong';
            }
            this.loadingSpinner = false;
          },
          error: (error) => {
            console.error(error);
            this.loadingSpinner = false;
            this.errorMessage = Constant.ERROR_MSG || 'Failed to process transfer';
          },
        });
    }
    else {
      this.updateMeeting();
    }
  }
  updateMeeting(): void {
    if (!this.meeting.title || !this.meeting.date || !this.meeting.time) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }
    if (this.meeting.participants.length === 0) {
      this.errorMessage = 'Please select at least one participant.';
      return;
    }
    this.meeting.participants = this.meeting.participants.map(String);
    this.loadingSpinner = true;
    this.errorMessage = '';
    this.app.coreMainService
      .updateMeeting(this.MeetID, this.userId, this.meeting).subscribe({
        next: (res: any) => {
          this.loadingSpinner = false;
          if (res['message'] == Constant.SUCCESS) {
            this.app.snackbar.open(res['message'], 'Close', { duration: 3000 });
            this.closeRefreshMeet.emit();
          } else {
            this.errorMessage = res['data'].error || 'Something went wrong';
          }
          this.loadingSpinner = false;
        },
        error: (error) => {
          console.error(error);
          this.loadingSpinner = false;
          this.errorMessage = Constant.ERROR_MSG || 'Failed to process transfer';
        },
      });
  }

  getMeetingDetail() {
    this.loadingSpinner = true;
    this.errorMessage = '';
    this.app.coreMainService.getMeetingDetail(this.MeetID, this.userId)
      .subscribe({
        next: (res: any) => {
          this.loadingSpinner = false;
          if (res['message'] == Constant.SUCCESS) {
            this.meeting = res['data'].meeting;
            if (this.meeting.date) {
              this.meeting.date = this.meeting.date.slice(0, 10);
            }
            this.meeting.participants = this.meeting.participants.map((id: any) => String(id));
            // Convert participants to numbers if needed
            //this.meeting.participants = this.meeting.participants.map((id: string) => Number(id));
            //this.meeting.participants = this.meeting.participants.map((user: any) => user.id);
          } else {
            this.errorMessage = res['data'];
          }
        },
        error: (error) => {
          this.loadingSpinner = false;
          this.errorMessage = Constant.ERROR_MSG;
        }
      });
  }

  getAllUsers(): void {
    this.loadingSpinner = true;
    this.errorMessage = '';
    this.app.coreMainService.getAllUsers()
      .subscribe({
        next: (res: any) => {
          this.loadingSpinner = false;
          if (res['message'] == Constant.SUCCESS) {
            this.users = res['data']
          } else {
            this.users = [];
            this.errorMessage = res['data'];
          }
        },
        error: (error) => {
          this.loadingSpinner = false;
          this.errorMessage = Constant.ERROR_MSG;
        }
      });
  }
}
