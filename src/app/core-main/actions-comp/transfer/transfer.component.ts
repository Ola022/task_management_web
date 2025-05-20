import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Constant } from '../../../resources/constants';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrl: './transfer.component.scss'
})
export class TransferComponent {

  amount: number = 0;
  recipientAccount: number = 0;  
  errorMessage: string = '';
  successMessage: string = '';
  loadingSpinner: boolean = false;  
  
  constructor(
    public dialogRef: MatDialogRef<TransferComponent>,
    @Inject(MAT_DIALOG_DATA) public userId: number,
    private app: AppService
  ) { }

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    if (this.amount <= 0) {
      this.errorMessage = 'Please enter a valid amount';
      return;
    }

    this.loadingSpinner = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.transferFunds(this.amount, this.recipientAccount);
  }

  
  transferFunds(amount: number, recipientAccountNumber: number): void {
    this.app.coreMainService
      .transfer(this.userId, amount, recipientAccountNumber).subscribe({
        next: (res: any) => {
          this.loadingSpinner = false;
          if (res['message'] === Constant.SUCCESS) {            
            this.app.snackbar.open(res['data'].message, 'Close', { duration: 3000 });
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
