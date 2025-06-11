import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from '../../../app.service';
import { Constant } from '../../../resources/constants';

@Component({
  selector: 'app-task-confirm-dialog',
  templateUrl: './task-confirm-dialog.component.html',
  styleUrl: './task-confirm-dialog.component.scss'
})
export class TaskConfirmDialogComponent implements OnInit {  
  loadingSpinner!: boolean;
  errorMessage!: string;

  constructor(
    public dialogRef: MatDialogRef<TaskConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public info: any, private app: AppService,        
  ) {     
  }

  ngOnInit(): void {

  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    if (!this.info || !this.info.taskid || !this.info.moveto) {
      this.errorMessage = 'Invalid task information';
      return;
    }
      
    this.loadingSpinner = true;
    this.errorMessage = '';
    this.app.coreMainService.updateTaskStatus(this.info.taskid, this.info.moveto, this.info.userID).subscribe({
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
    if (!this.info || !this.info.taskid) {
      this.errorMessage = 'Invalid task information';
      return;
    }

    this.loadingSpinner = true;
    this.errorMessage = '';
    this.app.coreMainService.deleteTask(this.info.taskid, this.info.userID).subscribe({
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
