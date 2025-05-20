import { Component, OnInit } from '@angular/core';
import { Constant } from '../../resources/constants';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss'
})
export class TransactionComponent implements OnInit {
  selectedTransaction: any;

  displayedColumns: string[] = ['transaction_type', 'amount', 'date', 'time', 'action'];

  // Mock transaction data
  transactions = [];
  loadingSpinner!: boolean;
  errorMessage!: string;  
  successMessage!: string;
  userInfo: any;
  userId!: number
  constructor(
    private app: AppService,
    private dialog: MatDialog,

  ) {
    this.userInfo = this.app.getFromStore(Constant.USER_INFO);
    this.userId = this.userInfo.id
  }

  ngOnInit(): void {
    this.fetchTransactions()


  }
  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Copied to clipboard:', text);
      // You might want to show a notification or some feedback here.
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  }

  getDate(timestamp: string): string {
    const date = new Date(timestamp);
    return date.toISOString().split('T')[0]; // Extracts the date part (YYYY-MM-DD)
  }
  getTime(timestamp: string): string {
    const date = new Date(timestamp);
    return date.toTimeString().split(' ')[0]; // Extracts the time part (HH:MM:SS)
  }

  fetchTransactions(): void {
    this.loadingSpinner = true;
    this.errorMessage = '';
    this.app.coreMainService.getTransactions(this.userId)
      .subscribe({
        next: (res: any) => {
          this.loadingSpinner = false;
          if (res['message'] == Constant.SUCCESS) {
            this.transactions = res['data']
            this.viewDetails(this.transactions[0])

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

  viewDetails(transaction: any) {
    this.selectedTransaction = transaction;

  }

  downloadReceipt() {
    if (this.selectedTransaction) {
      // Logic to download the receipt. This could be a PDF generation or a simple download link.
      const receiptData = `
        Bank: FAZ Bank
        Account Name: ORLAM OLA
        Account Number: ${this.selectedTransaction.to}
        Transaction ID: ${this.selectedTransaction.id}
        Date: ${this.selectedTransaction.timestamp}
        Description: ${this.selectedTransaction.transaction_type}
        Amount: ${this.selectedTransaction.money}
      `;
      const blob = new Blob([receiptData], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `receipt-${this.selectedTransaction.transactionId}.txt`;
      link.click();
    }
  }
}
