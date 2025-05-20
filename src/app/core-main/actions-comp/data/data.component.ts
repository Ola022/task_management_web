import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppService } from '../../../app.service';
import { Constant } from '../../../resources/constants';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrl: './data.component.scss'
})
export class DataComponent {
  dataFor: string = 'self';
  amount: number = 0;
  recipientNumber: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  loadingSpinner: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DataComponent>,
    @Inject(MAT_DIALOG_DATA) public userId: number,
    private app: AppService
  ) { }

  onCancel(): void {
    this.dialogRef.close();
  }

  onDataForChange(): void {
    // Reset recipient number when switching between 'self' and 'other'
    if (this.dataFor === 'self') {
      this.recipientNumber = '';  // Clear recipient number for self transfer
    }
  }

  onConfirm(): void {
    if (this.amount <= 0) {
      this.errorMessage = 'Please enter a valid amount';
      return;
    }

    if (this.dataFor === 'other' && !this.recipientNumber) {
      this.errorMessage = 'Please enter a valid recipient number';
      return;
    }

    this.loadingSpinner = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.dataFor === 'self') {
      this.buyDataSelf(this.amount);
    } else {
      this.buyDataOther(this.amount, this.recipientNumber);
    }
  }

  buyDataSelf(amount: number): void {
    this.app.coreMainService.buyDataSelf(this.userId, amount)
      .subscribe({
        next: (res: any) => {
          this.loadingSpinner = false;
          if (res['message'] === Constant.SUCCESS) {
            this.successMessage = res['data'].message;
            this.app.snackbar.open(this.successMessage, 'Close', { duration: 3000 });
            this.dialogRef.close('success');
          } else {
            this.errorMessage = res['data'].error || 'Something went wrong';
          }
        },
        error: (error) => {
          console.error(error);
          this.loadingSpinner = false;
          this.errorMessage = Constant.ERROR_MSG || 'Failed to process data purchase';
        },
      });
  }

  buyDataOther(amount: number, recipientNumber: string): void {
    this.app.coreMainService.buyDataOther(this.userId, amount, recipientNumber)
      .subscribe({
        next: (res: any) => {
          this.loadingSpinner = false;
          if (res['message'] === Constant.SUCCESS) {
            this.successMessage = res['data'].message;
            this.app.snackbar.open(this.successMessage, 'Close', { duration: 3000 });
            this.dialogRef.close('success');
          } else {
            this.errorMessage = res['data'].error || 'Something went wrong';
          }
        },
        error: (error) => {
          console.error(error);
          this.loadingSpinner = false;
          this.errorMessage = Constant.ERROR_MSG || 'Failed to process data purchase';
        },
      });
  }
}
