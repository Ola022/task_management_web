import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pay-bill',
  templateUrl: './pay-bill.component.html',
  styleUrl: './pay-bill.component.scss'
})
export class PayBillComponent {
  billType: string = '';
  amount: number = 0;

  constructor(public dialogRef: MatDialogRef<PayBillComponent>) { }

  onCancel(): void {
    this.dialogRef.close({ action: 'cancel' });
  }

  onConfirm(): void {
    this.dialogRef.close({
      action: 'pay_bill',
      billType: this.billType,
      amount: this.amount,
    });
  }
}

