import { Component, OnInit } from '@angular/core';
import { Constant } from '../../resources/constants';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from '../../app.service';
import { AddStaffDialogComponent } from './add-staff-dialog/add-staff-dialog.component';
import { VConfirmationComponent } from '../v-confirmation/v-confirmation.component';


@Component({
  selector: 'app-staffs',
  templateUrl: './staffs.component.html',
  styleUrl: './staffs.component.scss'
})
export class StaffsComponent implements OnInit {
selecteduser: any;

  displayedColumns: string[] = ['title', 'full_name', 'email', 'academic_rank', 'role', 'action'];

  // Mock user data
  users = [];
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
    this.getAllUsers()


  }
  getRole(text: string) {
    if(text == '1'){
      return 'Admin'
    }
    else{
      return 'Staff'
    }
  }

  getDate(timestamp: string): string {
    const date = new Date(timestamp);
    return date.toISOString().split('T')[0]; // Extracts the date part (YYYY-MM-DD)
  }
  getTime(timestamp: string): string {
    const date = new Date(timestamp);
    return date.toTimeString().split(' ')[0]; // Extracts the time part (HH:MM:SS)
  }

openCreate(){
    const dialogRef = this.dialog.open(AddStaffDialogComponent, {
      width: '900px',
      data:  this.userId,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Perform an action like checking balance
        this.getAllUsers();
      }
    });  
}

  getAllUsers(): void {
    this.loadingSpinner = true;
    this.errorMessage = '';
    this.app.coreMainService.getAllUsers()
      .subscribe({
        next: (res: any) => {
          this.loadingSpinner = false;
          if (res['message'] == Constant.SUCCESS) {
            this.users = res['data']           
          } else {
            this.users = [];
            this.errorMessage = res['data'];
          }
        },
        error: (error) => {
          this.loadingSpinner = false;
          this.errorMessage = Constant.ERROR_MSG;
        }
      });
  }

  viewDetails(user: any) {
    this.selecteduser = user;

  }
 openDeleteDialog(data: any) {
    let id = data?.id
    const dialogRef = this.dialog.open(VConfirmationComponent, {
      width: '400px',
      data: { 'action': 'delete', 'data': data, }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.app.snackbar.open('Oppps!, Still working on the functionality, Try later?', 'Close', { duration: 3000 });
        // this.deleteUser(data);
      }
    });
  }

  deleteUser(data: any) {
      this.errorMessage = '';
      this.app.coreMainService.deleteMeeting(data.id, this.userId)
        .subscribe({
          next: (res: any) => {
            this.loadingSpinner = false;
            if (res['message'] == Constant.SUCCESS) {
              this.app.snackbar.open('User deleted successfully', 'Close', { duration: 3000 });
              this.getAllUsers();

            } else {
              this.users = [];
              this.app.snackbar.open('Failed to delete task', 'Close', { duration: 3000 });
              this.errorMessage = res['data'].error || 'Something went wrong';
            }
          },
          error: (error) => {
            this.loadingSpinner = false;
            this.errorMessage = Constant.ERROR_MSG;
          }
        });
    }
  


}
