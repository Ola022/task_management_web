import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from '../../app.service';
import { Constant } from '../../resources/constants';


interface Overview {
  totalProjects: number;
  activeProjects: number;
  inactiveProjects: number;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
}

interface Project {
  id: number;
  name: string;
  status: string;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  overdueTasks: number;
}

interface UserMetrics {
  totalAssignedToMe: number;
  completedByMe: number;
  pendingForMe: number;
  overdueForMe: number;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  userInfo: any;
  userId: number = 0
  loadingSpinner: boolean = false;
  errorMessage: string = '';

  overview?: Overview;
  projects: Project[] = [];
  user?: UserMetrics;

  successMessage!: string;
  constructor(
    private app: AppService,
  ) {
    this.userInfo = this.app.getFromStore(Constant.USER_INFO);
    this.userId = this.userInfo.id
  }

  ngOnInit(): void {
    this.getMetrics()
  }

  getMetrics() {
    this.loadingSpinner = true;
    this.errorMessage = '';
    this.app.coreMainService.getMetrics(this.userId)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.loadingSpinner = false;
          if (res['message'] == Constant.SUCCESS) {            
            this.overview = res.data.overview;
            this.projects = res.data.projects;
            this.user = res.data.user;
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
