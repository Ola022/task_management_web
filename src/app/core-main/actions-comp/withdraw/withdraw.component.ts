import { Component, Inject } from '@angular/core';
import { Constant } from '../../../resources/constants';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from '../../../app.service';
import { TransferComponent } from '../transfer/transfer.component';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrl: './withdraw.component.scss'
})
export class WithdrawComponent {

  amount: number = 0;
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

    this.withdrawFunds(this.amount);
  }

  
  withdrawFunds(amount: number): void {
    this.app.coreMainService
      .withdraw(this.userId, amount).subscribe({
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
