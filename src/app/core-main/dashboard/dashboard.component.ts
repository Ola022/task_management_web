import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from '../../app.service';
import { Constant } from '../../resources/constants';
import { TransferComponent } from '../actions-comp/transfer/transfer.component';
import { DataComponent } from '../actions-comp/data/data.component';
import { PayBillComponent } from '../actions-comp/pay-bill/pay-bill.component';
import { AirtimeComponent } from '../actions-comp/airtime/airtime.component';
import { WithdrawComponent } from '../actions-comp/withdraw/withdraw.component';
import { DepositComponent } from '../actions-comp/deposit/deposit.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  userInfo: any;
  userId: number = 0
  loadingSpinner: boolean = false;
  errorMessage: string = '';
  balance: number = 0;

  displayedColumns: string[] = ['transaction_type', 'amount', 'date', 'time'];
  transactions = []
  // transactions = [
  //   { date: '10/22', description: 'Transfer to John', amount: 120.00 },
  //   { date: '10/21', description: 'Buy Airtime', amount: 15.00 },
  //   { date: '10/20', description: 'Salary Deposit', amount: 2500.00 },
  // ];
  successMessage!: string;
  constructor(
    private app: AppService,
    private dialog: MatDialog,

  ) {
    this.userInfo = this.app.getFromStore(Constant.USER_INFO);
    this.userId = this.userInfo.id
  }

  ngOnInit(): void {
    this.checkBalance()
    this.fetchTransactions()
  }
  getDate(timestamp: string): string {
    const date = new Date(timestamp);
    return date.toISOString().split('T')[0]; // Extracts the date part (YYYY-MM-DD)
  }
  getTime(timestamp: string): string {
    const date = new Date(timestamp);
    return date.toTimeString().split(' ')[0]; // Extracts the time part (HH:MM:SS)
  }
    
  copyToClipboard() {
    navigator.clipboard.writeText(this.userInfo.account_number)
      .then(() => {
        console.log('Copied to clipboard:', this.userInfo.account_number);

        // Show the snackbar notification
        this.app.snackbar.open('Account number copied to clipboard!', 'Close', {
          duration: 3000, // Duration in milliseconds (3 seconds here)
          verticalPosition: 'bottom', // You can use 'top' or 'bottom'
          horizontalPosition: 'center' // You can use 'start', 'center', 'end', 'left', or 'right'
        });
      })
      .catch(err => {
        console.error('Failed to copy:', err);

        // Optionally show an error message if the copy fails
        this.app.snackbar.open('Failed to copy account number. Please try again.', 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center'
        });
      });
  }
  checkBalance() {
    this.loadingSpinner = true;
    this.errorMessage = '';
    this.app.coreMainService.checkBalance(this.userId)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.loadingSpinner = false;
          if (res['message'] == Constant.SUCCESS) {
            this.balance = res['data'].balance;
            this.fetchTransactions()
          } else {
            this.balance = 0
            this.errorMessage = res['data'];
          }
        },
        error: (error) => {
          this.loadingSpinner = false;
          this.errorMessage = Constant.ERROR_MSG;
        }
      });

  }

  fetchTransactions(): void {
    this.loadingSpinner = true;
    this.errorMessage = '';
    this.app.coreMainService.getTransactions(this.userId)
      .subscribe({
        next: (res: any) => {          
          this.loadingSpinner = false;
          if (res['message'] == Constant.SUCCESS) {            
            this.transactions = res['data'].slice(-3).reverse(); // Slices the last 3 items
          
          } else {
            this.transactions = [];
            this.errorMessage = res['data'];
          }
        },
        error: (error) => {
          this.loadingSpinner = false;
          this.errorMessage = Constant.ERROR_MSG;
        }
      });
  }
  

  openTransferDialog() {
    const dialogRef = this.dialog.open(TransferComponent, {
      width: '400px',
      data:  this.userId ,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Perform an action like checking balance
        this.checkBalance();
      }
    });
  }

  openAirtimeDialog() {
    const dialogRef = this.dialog.open(AirtimeComponent, {
      width: '400px',
      data: this.userId ,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.checkBalance();
      }
    });
  }

  openDataDialog() {
    const dialogRef = this.dialog.open(DataComponent, {
      width: '400px',
      data: this.userId,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.checkBalance();
      }
    });
  }
  openWithdrawDialog() {
    const dialogRef = this.dialog.open(WithdrawComponent, {
      width: '400px',
      data: this.userId,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.checkBalance();
      }
    });
  }

  openDepositDialog() {
    const dialogRef = this.dialog.open(DepositComponent, {
      width: '400px',
      data: this.userId,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.checkBalance();
      }
    });
  }

  openPayBillDialog() {
    const dialogRef = this.dialog.open(PayBillComponent, {
      width: '400px',
      data: this.userId,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.checkBalance();
      }
    });
  }

  depositFunds(amount: number) {
    if (amount <= 0) {
      this.errorMessage = 'Please enter a valid amount';
      return;
    }
    this.loadingSpinner = true;
    this.errorMessage = '';
    this.app.coreMainService.deposit(this.userId, amount)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.loadingSpinner = false;
          if (res['message'] == Constant.SUCCESS) {
            this.successMessage = 'Deposit successful';
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
  

  
  
}
