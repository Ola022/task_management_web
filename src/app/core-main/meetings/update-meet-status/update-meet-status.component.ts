import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from '../../../app.service';
import { Constant } from '../../../resources/constants';

@Component({
  selector: 'app-update-meet-status',
  templateUrl: './update-meet-status.component.html',
  styleUrl: './update-meet-status.component.scss'
})
export class UpdateMeetStatusComponent {
statuses: string[] = ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'];

    
  status= this.Meet.status // this would be dynamically bound
  errorMessage!: string;
  loadingSpinner!: boolean;

  constructor(
    public dialogRef: MatDialogRef<UpdateMeetStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public Meet: any, private app: AppService,
  ) { }

  onCancel(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }
  
  save() {    
    this.loadingSpinner = true;
        this.errorMessage = '';
        this.app.coreMainService.updateMeetingStatus(this.Meet.meetId, this.status,  this.Meet.userID).subscribe({
          next: (res: any) => {
            this.loadingSpinner = false;
            if (res['message'] == Constant.SUCCESS) {
              this.app.snackbar.open(res['message'], 'Close', { duration: 3000 });
              this.dialogRef.close(true);
            } else {
              this.errorMessage = res['data'].error || 'Something went wrong';
            }
          },
          error: (error) => {
            console.error(error);
            this.loadingSpinner = false;
            this.errorMessage = Constant.ERROR_MSG || 'Failed to confirm task';
          },
        });
        
  }
  deleteTask(): void {
      if (!this.Meet || !this.Meet.meetId) {
        this.errorMessage = 'Invalid task information';
        return;
      }
  
      this.loadingSpinner = true;
      this.errorMessage = '';
      this.app.coreMainService.deleteMeeting(this.Meet.meetId, this.Meet.userID).subscribe({
        next: (res: any) => {
          this.loadingSpinner = false;
          if (res['message'] == Constant.SUCCESS) {
            this.app.snackbar.open(res['data'].message, 'Close', { duration: 3000 });
            this.dialogRef.close(true);
          } else {
            this.errorMessage = res['data'].error || 'Something went wrong';
          }
        },
        error: (error) => {
          console.error(error);
          this.loadingSpinner = false;
          this.errorMessage = Constant.ERROR_MSG || 'Failed to delete task';
        },
      });
    }

  
}
