import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-v-confirmation',
  templateUrl: './v-confirmation.component.html',
  styleUrl: './v-confirmation.component.scss'
})
export class VConfirmationComponent {

  constructor(
    public dialogRef: MatDialogRef<VConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public info: any,       
  ) {     
  }

  ngOnInit(): void {

  }

  onCancel(): void {
    this.dialogRef.close();
  }

  deleteRecord(){
    this.dialogRef.close(true)
  }

}
