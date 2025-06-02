import { Component, OnInit } from '@angular/core';
import { Constant } from '../../resources/constants';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from '../../app.service';
import { TaskConfirmDialogComponent } from './task-confirm-dialog/task-confirm-dialog.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {

  createdTasks: any;
  inProgressTasks: any;
  blockedTasks: any;
  toConfirmTasks: any;
  completedTasks: any;
  openSideNav: boolean = false;
  openCommentSideNav: boolean = false;

  openAddTaskDialog() {
    // Logic to open the add task dialog
    console.log('Open Add Task Dialog');
    // You can implement a dialog service or use Angular Material Dialog here
    // For example: this.dialog.open(AddTaskDialogComponent);
  }

  users = [];
  loadingSpinner!: boolean;
  errorMessage!: string;
  successMessage!: string;

  userInfo: any;
  selectedUser: any
  selectedPriority: any
  userId!: number
  selectedTaskID: number = 0; // Initialize with a default value
  selectedTask: any = null; // Initialize with null to indicate no task is selected

  constructor(
    private app: AppService,
    private dialog: MatDialog,

  ) {
    this.userInfo = this.app.getFromStore(Constant.USER_INFO);
    this.userId = this.userInfo.id
  }

  ngOnInit(): void {
    this.getAllUsers()

    this.createdTasks = this.createdTask()
    this.inProgressTasks = this.inProgressTask()
    this.blockedTasks = this.blockedTask()
    this.toConfirmTasks = this.confirmTask()
    this.completedTasks = this.completedTask()
  }
  closeSidenav() {
    this.openSideNav = false
  }
  openAddTaskNav() {
    this.selectedTaskID = 0
    this.openSideNav = true
    console.log(this.selectedTaskID)

  }

  editTask(task: any) {
    this.selectedTaskID = task.id; // Set the selected task ID
    this.openSideNav = true; // Open the side navigation
  }

  closeCommentSidenav() {
    this.openCommentSideNav = false
  }

  openComment(task: any) {
    this.selectedTaskID = task.id; // Set the selected task ID
    this.openCommentSideNav = true; // Open the side navigation
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


  // Example data
  allTasks = [
    { id: 11, title: 'Fix login bug', reporter: 'John Doe', priority: 'High', status: 'created' },
    { id: 2, title: 'TODO', reporter: 'John Tunde', priority: 'Low', status: 'created' },
    { id: 3, title: 'Fix login bug', reporter: 'John Doe', priority: 'High', status: 'created' },
    { id: 4, title: 'Write docs', reporter: 'Sarah', priority: 'Low', status: 'confirm' },
    { id: 12, title: 'Design UI', reporter: 'John Doe', priority: 'Medium', status: 'progress' },
    { id: 20, title: 'Design homepage', reporter: 'Jane Smith', priority: 'Medium', status: 'progress' },
    { id: 20, title: 'API integration', reporter: 'Mike Lee', priority: 'High', status: 'blocked' },
    { id: 30, title: 'Write documentation', reporter: 'Sarah Paul', priority: 'Low', status: 'confirm' },
    { id: 40, title: 'Write documentation', reporter: 'Sarah Paul', priority: 'Low', status: 'confirm' },
    { id: 40, title: 'Deploy to production', reporter: 'Emma Adams', priority: 'High', status: 'completed' }
  ];

  // Get unique reporters for dropdown
  get uniqueReporters(): string[] {
    const users = this.allTasks.map(t => t.reporter);
    return Array.from(new Set(users));
  }

  // Filtered task lists per column
  createdTask() {
    return this.filterTasksBy('created');
  }
  inProgressTask() {
    return this.filterTasksBy('progress');
  }
  blockedTask() {
    return this.filterTasksBy('blocked');
  }
  confirmTask() {
    return this.filterTasksBy('confirm');
  }
  completedTask() {
    return this.filterTasksBy('completed');
  }

  // Common filter logic  &&    (this.selectedPriority ? task.priority === this.selectedPriority : true)
  filterTasksBy(status: string) {
    return this.allTasks.filter(task => task.status === status);
  }

  filterTasksByReporter(status: string) {
    return this.allTasks.filter(task =>
      task.status === status && (this.selectedUser ? task.reporter === this.selectedUser : true)
    );
  }

  openDialog(moveto: string, task: any) {
    let id  = task?.id
    const dialogRef = this.dialog.open(TaskConfirmDialogComponent, {
      width: '400px',
      data: { 'moveto':moveto , 'id':id }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Perform an action like checking balance
        //this.checkBalance();
      }
    });
  }
}
