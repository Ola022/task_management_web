import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Constant } from '../../../resources/constants';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-airtime',
  templateUrl: './airtime.component.html',
  styleUrl: './airtime.component.scss'
})
export class AirtimeComponent {
  amount: number = 0;
  recipientPhoneNumber: string = '';  
  errorMessage: string = '';
  successMessage: string = '';
  loadingSpinner: boolean = false;
  transferType: 'self' | 'other' = 'self';  // Default to 'self'
  
  constructor(
    public dialogRef: MatDialogRef<AirtimeComponent>,
    @Inject(MAT_DIALOG_DATA) public userId: number,
    private app: AppService
  ) { }
  
  onCancel(): void {
    this.dialogRef.close();
  }
  
  
  onTransferTypeChange(): void {
    // Reset the recipient phone number when switching between self and other
    if (this.transferType === 'self') {
      this.recipientPhoneNumber = '';  // Clear the recipient's phone number for self transfer
    }
    // You can add other logic here, such as resetting other fields or changing form validation if needed.
  }
  
  
  onConfirm(): void {
    if (this.amount <= 0) {
      this.errorMessage = 'Please enter a valid amount';
      return;
    }
  
    if (this.transferType === 'other' && !this.recipientPhoneNumber) {
      this.errorMessage = 'Please enter a valid recipient phone number';
      return;
    }
  
    this.loadingSpinner = true;
    this.errorMessage = '';
    this.successMessage = '';
  
    if (this.transferType === 'self') {
      this.transferAirtimeSelf(this.amount);
    } else {
      this.transferAirtimeOther(this.amount, this.recipientPhoneNumber);
    }
  }
  
  transferAirtimeSelf(amount: number): void {
    this.app.coreMainService.airtimeSelf(this.userId, amount)
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
          this.errorMessage = Constant.ERROR_MSG || 'Failed to process transfer';
        },
      });
  }
  
  transferAirtimeOther(amount: number, recipientPhoneNumber: string): void {
    this.app.coreMainService.airtimeOther(this.userId, amount, recipientPhoneNumber)
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
          this.errorMessage = Constant.ERROR_MSG || 'Failed to process transfer';
        },
      });
  }
  
  
}
