import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from '../../app.service';
import { Constant } from '../../resources/constants';
import { TransferComponent } from '../actions-comp/transfer/transfer.component';

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
    
  }
  stats = {
  created: 10,
  inProgress: 6,
  blocked: 1,
  toConfirm: 3,
  completed: 8,
};

recentActivities = [
  { user: 'Jane', action: 'created', task: 'Task A', time: '2 mins ago' },
  { user: 'John', action: 'moved', task: 'Task B to In Progress', time: '10 mins ago' },
  { user: 'Mary', action: 'completed', task: 'Task C', time: '1 hour ago' },
  { user: 'Alex', action: 'blocked', task: 'Task D', time: 'Yesterday' },
];

  checkBalance() {
    this.loadingSpinner = true;
    this.errorMessage = '';
    // this.app.coreMainService.checkBalance(this.userId)
    //   .subscribe({
    //     next: (res: any) => {
    //       console.log(res);
    //       this.loadingSpinner = false;
    //       if (res['message'] == Constant.SUCCESS) {
    //         this.balance = res['data'].balance;
    //         this.fetchTransactions()
    //       } else {
    //         this.balance = 0
    //         this.errorMessage = res['data'];
    //       }
    //     },
    //     error: (error) => {
    //       this.loadingSpinner = false;
    //       this.errorMessage = Constant.ERROR_MSG;
    //     }
    //   });

  }

  fetchTransactions(): void {
    this.loadingSpinner = true;
    this.errorMessage = '';
    // this.app.coreMainService.getTransactions(this.userId)
    //   .subscribe({
    //     next: (res: any) => {          
    //       this.loadingSpinner = false;
    //       if (res['message'] == Constant.SUCCESS) {            
    //         this.transactions = res['data'].slice(-3).reverse(); // Slices the last 3 items
          
    //       } else {
    //         this.transactions = [];
    //         this.errorMessage = res['data'];
    //       }
    //     },
    //     error: (error) => {
    //       this.loadingSpinner = false;
    //       this.errorMessage = Constant.ERROR_MSG;
    //     }
    //   });
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

  depositFunds(amount: number) {
    if (amount <= 0) {
      this.errorMessage = 'Please enter a valid amount';
      return;
    }
    
    this.errorMessage = '';
    // this.app.coreMainService.deposit(this.userId, amount)
    //   .subscribe({
    //     next: (res: any) => {
    //       console.log(res);
    //       this.loadingSpinner = false;
    //       if (res['message'] == Constant.SUCCESS) {
    //         this.successMessage = 'Deposit successful';
    //       } else {
    //         this.errorMessage = res['data'];
    //       }
    //     },
    //     error: (error) => {
    //       this.loadingSpinner = false;
    //       this.errorMessage = Constant.ERROR_MSG;
    //     }
    //   });
  }
  

  
  
}
