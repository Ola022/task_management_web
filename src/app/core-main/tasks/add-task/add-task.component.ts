import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Constant } from '../../../resources/constants';
import { AppService } from '../../../app.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent implements OnInit {


  statuses = ['Created', 'Progress', 'Blocked', 'Review', 'Completed'];
  priorities = ['High', 'Medium', 'Low'];
  task = {
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
  };

  users: any;
  loadingSpinner!: boolean;
  errorMessage!: string;
  successMessage!: string;
  userInfo: any;
  userId!: number
  userName!: string;
  projectId: number = 0

  taskTitle: string = 'Add Task'; // Default task title
  action: string = 'Create Task'; // Default action is Add Task 
  isEditable: boolean = true

  @Input() taskID: number = 0;  // receives from parent
  @Output() public close: EventEmitter<any> = new EventEmitter<any>()
  @Output() public refresh: EventEmitter<any> = new EventEmitter<any>()
  constructor(private app: AppService, private route: ActivatedRoute,) {

  }

  ngOnInit(): void {
    
    const idParam = this.route.snapshot.paramMap.get('id');
    this.projectId = idParam ? +idParam : 0; 
    this.getAllUsers()
    if (this.taskID > 0) {
      this.taskTitle = 'Edit Task'; // Change title if taskID is provided
      this.action = 'Save Changes'; // Change action to Edit
      this.isEditable = false
      // Fetch task details if taskID is provided
      this.getTaskDetails();
    }
    else {
      this.userInfo = this.app.getFromStore(Constant.USER_INFO);
      this.userId = this.userInfo.id
      this.userName = this.userInfo.full_name
    }
    console.log(this.taskID, this.isEditable)
    
  }

  closeComment() {
    this.close.emit()
  }
  allowEdit() {
    this.isEditable = true
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


  addTask() {
    if (this.taskID > 0) {
      this.updateTask();
    }
    else {
      this.task.assignor_id = this.userId
      this.task.created_at = Date.now().toString()
      console.log(this.task);

      this.app.coreMainService.createTask(this.projectId, this.userId, this.task).subscribe({
        next: (res: any) => {
          this.loadingSpinner = false;
          if (res['message'] == Constant.SUCCESS) {
            this.app.snackbar.open(res['message'], 'Close', { duration: 3000 });
            this.refresh.emit()
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
  updateTask() {
    this.loadingSpinner = true;
    this.errorMessage = '';
    console.log(this.task);
    this.task.assignor_id = this.userId; // Ensure assignor_id is set to current user
    this.app.coreMainService.updateTask(this.taskID, this.userId, this.task).subscribe({
      next: (res: any) => {
        this.loadingSpinner = false;
        if (res['message'] == Constant.SUCCESS) {
          this.app.snackbar.open(res['message'], 'Close', { duration: 3000 });
          this.refresh.emit()
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

  getTaskDetails() {
    this.loadingSpinner = true;
    this.errorMessage = '';
    let user_Id = this.app.getFromStore(Constant.USER_INFO).id;
    this.app.coreMainService.getTaskDetail(this.taskID, user_Id)
      .subscribe({
        next: (res: any) => {
          this.loadingSpinner = false;
          if (res['message'] == Constant.SUCCESS) {
            this.task = res['data'].task;
            this.task.due_date = new Date(this.task.due_date).toISOString().split('T')[0]; // Format date
            this.task.created_at = new Date(this.task.created_at).toISOString().split('T')[0]; // Format date
            console.log(this.task);

            this.userInfo = this.getUserById(this.task.assignor_id);
            this.userId = this.userInfo.id
            this.userName = this.userInfo.full_name
          } else {
            this.errorMessage = res['data'];
          }
        },
        error: (error) => {
          this.loadingSpinner = false;
          this.errorMessage = Constant.ERROR_MSG;
        }
      });
  }

}


