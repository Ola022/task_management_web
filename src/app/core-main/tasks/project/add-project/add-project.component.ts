import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { AppService } from '../../../../app.service';
import { Constant } from '../../../../resources/constants';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.scss'
})
export class AddProjectComponent {
users: any;
  loadingSpinner!: boolean;
  errorMessage!: string;
  successMessage!: string;
  userInfo: any;
  userId!: number
  userName!: string;

  project: any = { name: '', description: '', due_date: '' };
  imageFile: File | undefined = undefined;

  taskTitle: string = 'Add Task'; // Default task title
  action: string = 'Create Task'; // Default action is Add Task 
  isEditable: boolean = true

  @Input() projectID: number = 0;  // receives from parent
  @Output() public close: EventEmitter<any> = new EventEmitter<any>()
  @Output() public refresh: EventEmitter<any> = new EventEmitter<any>()
  constructor(private app: AppService) {

  }

  ngOnInit(): void {
    this.getAllUsers()
    if (this.projectID > 0) {
      this.taskTitle = 'Edit Project'; // Change title if projectID is provided
      this.action = 'Save Changes'; // Change action to Edit
      this.isEditable = false
      
      this.getProjectDetails();
    }
    else {
      this.userInfo = this.app.getFromStore(Constant.USER_INFO);
      this.userId = this.userInfo.id
      this.userName = this.userInfo.full_name
    }
    console.log(this.projectID, this.isEditable)
    
  }
  
   previewUrl: string | ArrayBuffer | null = null;
onFileChange(event: any) {
  if (event.target.files && event.target.files.length > 0) {
    this.imageFile = event.target.files[0];

    // generate preview
    const reader = new FileReader();
    reader.onload = () => this.previewUrl = reader.result;
    //reader.readAsDataURL(this.imageFile);
  } else {
    this.imageFile = undefined;
    this.previewUrl = null;
  
}

  }

  closeaddProjecgt() {
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


  addProject() {
    if (!this.project.name || !this.project.description || !this.project.due_date) {
    this.errorMessage = 'All fields are required';
    return;
  }

    if (this.projectID > 0) {
      this.updateProject();
    }
    else {
     const formData = new FormData();
  formData.append('name', this.project.name);
  formData.append('description', this.project.description);
  formData.append('due_date', this.project.due_date || '');

  if (this.imageFile) {
    formData.append('image', this.imageFile); // Safe, TS knows it's defined
  }
    this.loadingSpinner = true;
    this.errorMessage = '';
      this.app.coreMainService.createProject(this.userId, formData).subscribe({
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

  updateProject() {
  this.loadingSpinner = true;
  this.errorMessage = '';

  // Ensure userId is set
  this.project.user_id = this.userId;

  this.app.coreMainService.updateProject(this.userId, this.projectID, this.project, this.imageFile)
    .subscribe({
      next: (res: any) => {
        this.loadingSpinner = false;
        if (res['message'] == Constant.SUCCESS) {
          this.app.snackbar.open(res['message'], 'Close', { duration: 3000 });
          this.refresh.emit(); // notify parent to reload projects
        } else {
          this.errorMessage = res['data'].error || 'Something went wrong';
        }
      },
      error: (error) => {
        console.error(error);
        this.loadingSpinner = false;
        this.errorMessage = Constant.ERROR_MSG || 'Failed to update project';
      },
    });
}

getProjectDetails() {
  this.loadingSpinner = true;
  this.errorMessage = '';

  
  this.app.coreMainService.getProjectDetail(this.projectID, this.userId)
    .subscribe({
      next: (res: any) => {
        this.loadingSpinner = false;
        if (res['message'] == Constant.SUCCESS) {
          this.project = res['data'].project;

          // format dates to yyyy-mm-dd for form inputs
          this.project.due_date = this.project.due_date
            ? new Date(this.project.due_date).toISOString().split('T')[0]
            : '';
          this.project.created_at = this.project.created_at
            ? new Date(this.project.created_at).toISOString().split('T')[0]
            : '';

          console.log('Project details:', this.project);
        } else {
          this.errorMessage = res['data'];
        }
      },
      error: (error) => {
        console.error(error);
        this.loadingSpinner = false;
        this.errorMessage = Constant.ERROR_MSG;
      },
    });
}
}
