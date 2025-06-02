import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from '../../../app.service';
import { Constant } from '../../../resources/constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-staff-dialog',
  templateUrl: './add-staff-dialog.component.html',
  styleUrl: './add-staff-dialog.component.scss'
})
export class AddStaffDialogComponent {

  user = {
    full_name: '',
    email: '',
    password: '',
    title: '',
    academic_rank: '',
    role: 0,
    image_url: '',
    created_at: '',
  };
  userForm: FormGroup;

  titles = ['Dr.', 'Prof.', 'Mr.', 'Mrs.', 'Miss', 'Engr.', 'Rev.'];
  ranks = [
    'Graduate Assistant',
    'Assistant Lecturer',
    'Lecturer II',
    'Lecturer I',
    'Senior Lecturer',
    'Associate Professor',
    'Professor',
  ]

  errorMessage: string = '';
  successMessage: string = '';
  loadingSpinner: boolean = false;

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddStaffDialogComponent>, @Inject(MAT_DIALOG_DATA) public userId: number, private app: AppService) {
    this.userForm = this.fb.group({
      full_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      title: ['', Validators.required],
      academic_rank: ['', Validators.required],
      role: [0, Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (!this.userForm.valid) {
      console.log(this.userForm.value);
    }
    else if (this.userForm.get('password')?.value == this.userForm.get('confirm_password')?.value) {
      this.user.academic_rank = this.userForm.get('academic_rank')?.value;
      this.user.created_at = new Date().toString();
      this.user.email = this.userForm.get('email')?.value;
      this.user.full_name = this.userForm.get('full_name')?.value;
      this.user.password = this.userForm.get('password')?.value;
      this.user.role = this.userForm.get('role')?.value;
      this.user.title = this.userForm.get('title')?.value;
      this.addStaff();
    }
  }


  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {

    this.addStaff();
  }

  addStaff(): void {
    this.app.coreMainService
      .createUser(this.user).subscribe({
        next: (res: any) => {
          this.loadingSpinner = false;
          if (res['message'] == Constant.SUCCESS) {
            this.app.snackbar.open(res['message'], 'Close', { duration: 3000 });
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
