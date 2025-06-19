import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from '../../../app.service';
import { Constant } from '../../../resources/constants';

@Component({
  selector: 'app-task-comment',
  templateUrl: './task-comment.component.html',
  styleUrl: './task-comment.component.scss'
})
export class TaskCommentComponent {
  userInfo: any
  userId!: number
  @Input() taskID: number = 0;  // receives from parent  
  @Output() public close: EventEmitter<any> = new EventEmitter<any>()
  loadingSpinner!: boolean;
  errorMessage!: string;
  newMessage = '';

  users: any[] = [];
  messages: any[] = [];
  constructor(
    private app: AppService,
  ) {
    this.userInfo = this.app.getFromStore(Constant.USER_INFO);
    this.userId = this.userInfo.id
  }

  closeComment() {
    this.close.emit()
  }

  ngOnInit(): void {
    this.getAllUsers()
  }

  getUserById(userId: number) {
    if (!this.users) return null;
    return this.users.find((user: any) => user.id === userId) || null;
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
            this.getAllComments()
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

  getAllComments() {
    this.errorMessage = '';
    this.app.coreMainService.getCommentsForTask(this.taskID, this.userId)
      .subscribe({
        next: (res: any) => {
          if (res['message'] == Constant.SUCCESS) {
            this.messages = res['data'].comments;
          } else {
            this.messages = [];
            this.errorMessage = res['data'];
          }
        },
        error: (error) => {
          console.error(error);
          this.errorMessage = Constant.ERROR_MSG || 'Failed to load comments';
        }
      });
  }
  ngOnChanges() {
    if (this.taskID) {
      this.getAllComments();
    }
  }


  sendComment() {
    if (!this.newMessage.trim()) return;
    this.app.coreMainService.addCommentToTask(this.taskID, this.userId, this.newMessage)
      .subscribe({
        next: (res: any) => {
          if (res['message'] == Constant.SUCCESS) {
            // this.app.snackbar.open('Comment added successfully', 'Close', { duration: 3000 });
            this.newMessage = '';
            this.getAllComments()
          } else {
            this.errorMessage = res['data'];
          }
        },
        error: (error) => {
          console.error(error);
          this.errorMessage = Constant.ERROR_MSG || 'Failed to add comment';
        }
      });
  }

  formatTimestamp(isoString: string): string {
    if (!isoString) return '';
    const date = new Date(isoString);
    // Example: 2025-06-11 09:09
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  getInitials(name: string): string {
    if (!name) return '';
    return name
      .split(' ')
      .filter(n => n) // remove empty strings
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }
}
