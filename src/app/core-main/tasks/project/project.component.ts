import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { AppService } from '../../../app.service';
import { Constant } from '../../../resources/constants';
import { VConfirmationComponent } from '../../v-confirmation/v-confirmation.component';
import { Router } from '@angular/router';
import { TaskConfirmDialogComponent } from '../task-confirm-dialog/task-confirm-dialog.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent implements OnInit {
  projects: any[] = [];
  errorMessage = '';
  loadingSpinner = true;
  userInfo: any;
  userId!: number
  selectedProjectID: number = 0; // Initialize with a default value
  selectedProject: any = null; // Initialize with null to indicate no task is selected
  openSideNav: boolean = false;
  allTasks: any[] = []
  users: any[] = [];
  selectStatus = 'active'
  status = '';
  filteredProjects: any[] = [];  // filtered list

  constructor(
    private app: AppService,
    private dialog: MatDialog,
    private router: Router,
  ) {
    this.userInfo = this.app.getFromStore(Constant.USER_INFO);
    this.userId = this.userInfo.id
  }


  ngOnInit(): void {
    this.getAllProjects();
    this.getAllUsers();
  }

  closeSidenav() {
    this.openSideNav = false
  }

  closeSidenavSaved() {
    this.openSideNav = false
    this.getAllProjects()
  }

  openAddProjectNav() {
    this.selectedProjectID = 0
    this.openSideNav = true
  }

  editProject(project: any) {
    this.selectedProjectID = project.id; // Set the selected task ID
    this.openSideNav = true; // Open the side navigation
  }

  // GET ALL
  getAllProjects(): void {
    this.errorMessage = '';
    this.loadingSpinner = true;
    this.app.coreMainService.getAllProjects(this.userId, false).subscribe({
      next: (res: any) => {
        this.loadingSpinner = false;
        if (res['message'] === Constant.SUCCESS) {
          this.projects = res['data'].projects.reverse();
          this.applyFilter(); // show filtered immediately
        } else {
          this.projects = [];
          this.errorMessage = res['data'];
        }
      },
      error: (error) => {
        this.loadingSpinner = false;
        this.errorMessage = Constant.ERROR_MSG;
      }
    });
  }
  // Apply filter client-side
  applyFilter(): void {
    if (this.selectStatus === 'all') {
      this.filteredProjects = [...this.projects];
    } else {
      this.filteredProjects = this.projects.filter(
        p => p.status.toLowerCase() === this.selectStatus.toLowerCase()
      );
    }
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
  getOppStatus(status: string){
    if(status == 'active')
      return 'Inactive'
    else return 'Active'
    
  }
  
    openDialog(moveto: string, task: any) {
      moveto = this.getOppStatus(moveto).toLowerCase()
      let id = task?.id
      const dialogRef = this.dialog.open(TaskConfirmDialogComponent, {
        width: '400px',
        data: { 'action': 'change_status', 'moveto': moveto, 'taskid': id, 'userID': this.userId }
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.getAllProjects();
          this.app.snackbar.open('Project Status Updated to ' + moveto, 'Close', { duration: 3000 });
        }
      });
    }
  
  // ADD
  openAddProjectDialog(): void {

  }

  getname(id: number) {
    let name = this.users.find(u => u.id == id)?.full_name
    return name

  }
  // VIEW
  viewProject(project: any): void {
    this.router.navigate(['/app/projects', project.id]);
  }
  openDeleteDialog(data: any) {
    let id = data?.id
    const dialogRef = this.dialog.open(VConfirmationComponent, {
      width: '400px',
      data: { 'action': 'delete', 'data': data, }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteProject(data)
        // this.deleteUser(data);
      }
    });
  }

  // DELETE
  deleteProject(project: any): void {
    this.errorMessage = '';
    this.app.coreMainService.deleteProject(project.id, this.userId).subscribe({
      next: (res: any) => {
        if (res['message'] === Constant.SUCCESS) {
          this.app.snackbar.open(res['message'], 'Close', { duration: 3000 });
          this.getAllProjects();
        } else {
          this.errorMessage = res['data'].error || 'Delete failed';
        }
      },
      error: (error) => {
        this.errorMessage = Constant.ERROR_MSG;
      }
    });
  }
}
