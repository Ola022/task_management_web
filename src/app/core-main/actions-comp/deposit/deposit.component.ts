import { Component, Inject } from '@angular/core';
import { Constant } from '../../../resources/constants';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrl: './deposit.component.scss'
})
export class DepositComponent {
  amount: number = 0;
  recipientAccount: number = 0;  
  errorMessage: string = '';
  successMessage: string = '';
  loadingSpinner: boolean = false;  
  
  constructor(
    public dialogRef: MatDialogRef<DepositComponent>,
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

    this.deposit(this.amount);
  }

  
  deposit(amount: number): void {
    this.app.coreMainService
      .deposit(this.userId, amount).subscribe({
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
