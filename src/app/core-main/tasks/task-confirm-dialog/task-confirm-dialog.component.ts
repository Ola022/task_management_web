import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-task-confirm-dialog',
  templateUrl: './task-confirm-dialog.component.html',
  styleUrl: './task-confirm-dialog.component.scss'
})
export class TaskConfirmDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TaskConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public info: any,
  ) { }

  ngOnInit(): void {

  }

  onCancel(): void {
    this.dialogRef.close();
  }
  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
