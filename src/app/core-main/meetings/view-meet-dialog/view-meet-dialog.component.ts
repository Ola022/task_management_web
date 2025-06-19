import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskConfirmDialogComponent } from '../../tasks/task-confirm-dialog/task-confirm-dialog.component';
import { AppService } from '../../../app.service';
import { Constant } from '../../../resources/constants';

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
    date: '',
    time: '',
    locationType: '',
    url: '',
    venue: '',
    agenda: '',
    status: '',
    types: "meetings",
    
  };
  users: any;
  loadingSpinner!: boolean;
  errorMessage!: string;
    
  constructor(private app: AppService,
    public dialogRef: MatDialogRef<TaskConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public Meet: any,
  ) { }

  onCancel(): void {
    this.dialogRef.close();
  }
  
  ngOnInit(): void {
    this.getAllUsers()
    if (this.Meet.id > 0) {

      this.meeting = {
        title: this.Meet?.title, 
        organizer: this.Meet?.organizer,
        participants: this.Meet?.participants,  
        date: this.Meet?.date,
        time: this.Meet?.time,
        locationType: this.Meet?.locationType,
        url: this.Meet?.url,
        venue: this.Meet?.venue,
        agenda: this.Meet?.agenda,
        status: this.Meet?.status,
        types: this.Meet?.types
      };

    }
  }
    

  getUserById(userId: number) {
      if (!this.users) return null;
      return this.users.find((user: any) => user.id === userId) || null;
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
