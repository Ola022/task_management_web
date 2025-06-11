import { Component, OnInit } from '@angular/core';
import { Constant } from '../../resources/constants';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from '../../app.service';
import { TaskConfirmDialogComponent } from './task-confirm-dialog/task-confirm-dialog.component';
interface Task {
  id: number;
  [key: string]: any;
  title: '',
  description: '',
  assignor_id: 0,
  assignee_id: 0,
  status: 'ToDo',
  priority: 'Medium',
  types: 'Task',
  story_point: '',
  created_at: "",
  due_date: ""
}
interface User {
  id: number;
  full_name: string;

}
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {

  createdTasks: any[] = [];
  inProgressTasks: any[] = [];
  blockedTasks: any[] = [];
  toConfirmTasks: any[] = [];
  completedTasks: any[] = [];
  openSideNav: boolean = false;
  openCommentSideNav: boolean = false;

  openAddTaskDialog() {
    // Logic to open the add task dialog
    console.log('Open Add Task Dialog');
    // You can implement a dialog service or use Angular Material Dialog here
    // For example: this.dialog.open(AddTaskDialogComponent);
  }

  users: any[] = [];
  loadingSpinner!: boolean;
  errorMessage!: string;
  successMessage!: string;

  userInfo: any;
  selectedUser: any
  selectedPriority: any
  userId!: number
  selectedTaskID: number = 0; // Initialize with a default value
  selectedTask: any = null; // Initialize with null to indicate no task is selected

  allTasks: any[] = []
  allTasksReseved: any[] = []
  

  constructor(
    private app: AppService,
    private dialog: MatDialog,

  ) {
    this.userInfo = this.app.getFromStore(Constant.USER_INFO);
    this.userId = this.userInfo.id
  }

  ngOnInit(): void {
    this.getAllUsers()
    this.getAllTask()
  }

  closeSidenav() {
    this.openSideNav = false
  }
  closeSidenavSaved() {
    this.openSideNav = false
    this.getAllTask()
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



  getFirstName(user: any): string {
    return user.title + ' ' + user.full_name.split(' ')[0];
  }

  getUserById(userId: number) {
    if (!this.users) return null;
    return this.users.find((user: any) => user.id === userId) || null;
  }

  filterTasksByPriority(): void {
    this.allTasks = this.allTasksReseved; // Reset to original tasks  
    if (!this.selectedPriority) {
      this.getAllTask();
    } else {
      this.allTasks = this.allTasks.filter((task: any) => task.priority === this.selectedPriority);
    }
    this.loadAllTasksStages();
  }

  filterTasksByUser(): void {
    this.allTasks = this.allTasksReseved; // Reset to original tasks
    console.log('Filtering tasks by user:', this.selectedUser.id);
    if (!this.selectedUser) {
      this.getAllTask();
    }
    this.allTasks = this.allTasks.filter((task: any) => task.assignee_id == this.selectedUser.id);
    console.log('Filtered tasks:', this.allTasks);
    this.loadAllTasksStages();
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

  getAllTask() {
    this.errorMessage = '';
    this.app.coreMainService.getAllTasks(this.userId)
      .subscribe({
        next: (res: any) => {
          this.loadingSpinner = false;
          if (res['message'] == Constant.SUCCESS) {
            this.allTasks = res['data'].tasks
            this.allTasksReseved = res['data'].tasks

            this.loadAllTasksStages();

          } else {
            this.allTasks = [];
            this.errorMessage = res['data'];
          }
        },
        error: (error) => {
          this.loadingSpinner = false;
          this.errorMessage = Constant.ERROR_MSG;
        }
      });
  }
  loadAllTasksStages() {
    this.createdTasks = this.createdTask()
    this.inProgressTasks = this.inProgressTask()
    this.blockedTasks = this.blockedTask()
    this.toConfirmTasks = this.confirmTask()
    this.completedTasks = this.completedTask()
  }
  // Filtered task lists per column
  createdTask() {
    return this.filterTasksBy('Created');
  }
  inProgressTask() {
    return this.filterTasksBy('Progress');
  }
  blockedTask() {
    return this.filterTasksBy('Blocked');
  }
  confirmTask() {
    return this.filterTasksBy('Review');
  }
  completedTask() {
    return this.filterTasksBy('Completed');
  }

  // Common filter logic && (this.selectedPriority ? task.priority === this.selectedPriority : true)
  filterTasksBy(status: string) {
    return this.allTasks.filter((task: Task) => task.status === status);
    // return this.allTasks.filter(task => task.status === status);
  }

  openDialog(moveto: string, task: any) {
    let id = task?.id
    const dialogRef = this.dialog.open(TaskConfirmDialogComponent, {
      width: '400px',
      data: { 'action':'move', 'moveto': moveto, 'taskid': id, 'userID': this.userId }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAllTask();
        this.app.snackbar.open('Task moved to ' + moveto, 'Close', { duration: 3000 });
      }
    });
  }
  
  openDeleteDialog(task: any) {
    let id = task?.id
    const dialogRef = this.dialog.open(TaskConfirmDialogComponent, {
      width: '400px',
      data: { 'action':'delete', 'moveto': '', 'taskid': id, 'userID': this.userId }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAllTask();
        
      }
    });
  }
}
