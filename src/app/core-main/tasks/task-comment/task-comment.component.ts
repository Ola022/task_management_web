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
  messages: any[]= [];
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


  // sendMessage() {
  //   if (!this.newMessage.trim()) return;

  //   this.messages.push({
  //     sender: this.currentUser,
  //     text: this.newMessage,
  //     time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  //   });

  //   this.newMessage = '';
  // }

  // currentUser = 'Seyi Gabriel'; // or get from auth
  // newMessage = '';
//{ sender: 'John Doe', text: 'Hey, how are you?', time: '2:30 PM' },
  //  { sender: 'Seyi Gabriel', text: 'I’m good, just working on the new UI.', time: '2:31 PM' }
  

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }
}
