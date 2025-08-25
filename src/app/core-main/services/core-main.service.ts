import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { BaseUrlService } from '../../base/base-url.service';
import { Signup } from '../../core/core.model';

@Injectable({
  providedIn: 'root'
})
export class CoreMainService {

  url: string = this.base._baseUrl;

  constructor(private http: HttpClient, private base: BaseUrlService) { }

  createUser(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}users/signup`, data)
      .pipe(catchError((err) => this.base.errorHandler(err)));
  }
  // 1. Get all users
  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.url}users/all`)
      .pipe(catchError(err => this.base.errorHandler(err)));
  }




createProject(userId: number, data: FormData): Observable<any> {
  return this.http.post<any>(`${this.url}project/create/${userId}`, data)
    .pipe(catchError(err => this.base.errorHandler(err)));
}
  // 2. Create new project (multipart form-data)
  createProjectt(userId: number, project: any, image?: File): Observable<any> {
    const formData = new FormData();
    formData.append('name', project.name);
    formData.append('description', project.description || '');
    formData.append('due_date', project.due_date || '');
    if (image) {
      formData.append('image', image, image.name);
    }
    return this.http.post<any>(`${this.url}create/${userId}`, formData)
      .pipe(catchError(err => this.base.errorHandler(err)));
  }

  // 2. Get all projects for a user
  getAllProjects(userId: number, includeTasks: boolean = false): Observable<any> {
    return this.http.get<any>(
      `${this.url}project/all?user_id=${userId}&include_tasks=${includeTasks}`
    ).pipe(
      catchError(err => this.base.errorHandler(err))
    );
  }

  // 3. Get project details
  getProjectDetail( userId: number, projectId: number): Observable<any> {
    return this.http.get<any>(`${this.url}project/${projectId}/${userId}`)
      .pipe(catchError(err => this.base.errorHandler(err)));
  }

  // 4. Update project  
  updateProject(userId: number, projectId: number, project: any, image?: File): Observable<any> {
    const formData = new FormData();
    formData.append('name', project.name);
    formData.append('description', project.description || '');
    formData.append('due_date', project.due_date || '');
    if (image) {
      formData.append('image', image, image.name);
    }

    return this.http.put<any>(`${this.url}project/update/${userId}/${projectId}`, formData)
      .pipe(catchError(err => this.base.errorHandler(err)));
  }

  // 5. Delete project
  deleteProject(projectId: number, userId: number): Observable<any> {
    return this.http.delete<any>(`${this.url}project/delete/${projectId}/${userId}`)
      .pipe(catchError(err => this.base.errorHandler(err)));
  }

  // 6. Assign a user to project
  assignUserToProject(projectId: number, userId: number, targetUserId: number): Observable<any> {
    return this.http.post<any>(`${this.url}project/assign/${projectId}/${userId}/${targetUserId}`, {})
      .pipe(catchError(err => this.base.errorHandler(err)));
  }

  // 7. Remove a user from project
  removeUserFromProject(projectId: number, userId: number, targetUserId: number): Observable<any> {
    return this.http.delete<any>(`${this.url}project/remove/${projectId}/${userId}/${targetUserId}`)
      .pipe(catchError(err => this.base.errorHandler(err)));
  }

  // 8. Get all users in a project
  getProjectUsers(projectId: number, userId: number): Observable<any> {
    return this.http.get<any>(`${this.url}project/users/${projectId}/${userId}`)
      .pipe(catchError(err => this.base.errorHandler(err)));
  }

  // 9. Upload project image
  uploadProjectImage(projectId: number, userId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(`${this.url}project/upload-image/${projectId}/${userId}`, formData)
      .pipe(catchError(err => this.base.errorHandler(err)));
  }




  // 1. Create a new task (project_id is required)
  createTask(projectId: number, userId: number, data: any): Observable<any> {
    return this.http.post<any>(`${this.url}task/create/${projectId}/${userId}`, data)
      .pipe(catchError(err => this.base.errorHandler(err)));
  }

  // 2. Get tasks by status for a project
  getTasksByStatus(projectId: number, status: string, userId: number): Observable<any> {
    return this.http.get<any>(`${this.url}task/status/${projectId}/${status}/${userId}`)
      .pipe(catchError(err => this.base.errorHandler(err)));
  }

  // 3. Get tasks assigned to the current user in a project
  getMyTasks(projectId: number, userId: number): Observable<any> {
    return this.http.get<any>(`${this.url}task/mine/${projectId}/${userId}`)
      .pipe(catchError(err => this.base.errorHandler(err)));
  }

  // 4. Get all tasks in a project
  getAllTasks(projectId: number, userId: number): Observable<any> {
    return this.http.get<any>(`${this.url}task/all/${projectId}/${userId}`)
      .pipe(catchError(err => this.base.errorHandler(err)));
  }

  // 5. Get tasks by type for a project
  getTasksByType(projectId: number, taskType: string, userId: number): Observable<any> {
    return this.http.get<any>(`${this.url}task/type/${projectId}/${taskType}/${userId}`)
      .pipe(catchError(err => this.base.errorHandler(err)));
  }

  // 6. Get task detail
  getTaskDetail(taskId: number, userId: number): Observable<any> {
    return this.http.get<any>(`${this.url}task/detail/${taskId}/${userId}`)
      .pipe(catchError(err => this.base.errorHandler(err)));
  }

  // 7. Update task
  updateTask(taskId: number, userId: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.url}task/update/${taskId}/${userId}`, data)
      .pipe(catchError(err => this.base.errorHandler(err)));
  }
  // 7. Update task status
  updateTaskStatus(taskId: number, newStatus: string, userId: number): Observable<any> {
    return this.http.put<any>(`${this.url}task/status/update/${taskId}/${newStatus}/${userId}`, {})
      .pipe(catchError(err => this.base.errorHandler(err)));
  }

  // 8. Reassign task to new user
  assignNewUser(taskId: number, newUserId: number, userId: number): Observable<any> {
    return this.http.put<any>(`${this.url}task/reassign/${taskId}/${newUserId}/${userId}`, {})
      .pipe(catchError(err => this.base.errorHandler(err)));
  }

  // 9. Delete a task
  deleteTask(taskId: number, userId: number): Observable<any> {
    return this.http.delete<any>(`${this.url}task/delete/${taskId}/${userId}`)
      .pipe(catchError(err => this.base.errorHandler(err)));
  }

  addCommentToTask(taskId: number, userId: number, commentText: string): Observable<any> {
    const params = new HttpParams().set('comment_text', commentText);
    return this.http.post<any>(
      `${this.url}task/comment/add/${taskId}/${userId}`,
      {},
      { params }
    ).pipe(catchError(err => this.base.errorHandler(err)));
  }
  // 11. Get comments for a task
  getCommentsForTask(taskId: number, userId: number): Observable<any> {
    return this.http.get<any>(`${this.url}task/comment/all/${taskId}/${userId}`)
      .pipe(catchError(err => this.base.errorHandler(err)));
  }

  // 12. Delete comment
  deleteComment(commentId: number, userId: number): Observable<any> {
    return this.http.delete<any>(`${this.url}task/comment/delete/${commentId}/${userId}`)
      .pipe(catchError(err => this.base.errorHandler(err)));
  }





  createMeeting(userId: number, meeting: any): Observable<any> {
    return this.http.post(`${this.url}meeting/create/${userId}`, meeting)
      .pipe(catchError(err => this.base.errorHandler(err)));
  }

  getAllMeetings(userId: number): Observable<any> {
    return this.http.get(`${this.url}meeting/all/${userId}`)
      .pipe(catchError(err => this.base.errorHandler(err)));
  }

  getMeetingDetail(meetingId: number, userId: number): Observable<any> {
    return this.http.get(`${this.url}meeting/detail/${meetingId}/${userId}`)
      .pipe(catchError(err => this.base.errorHandler(err)));
  }

  updateMeeting(meetingId: number, userId: number, meeting: any): Observable<any> {
    return this.http.put(`${this.url}meeting/update/${meetingId}/${userId}`, meeting)
      .pipe(catchError(err => this.base.errorHandler(err)));
  }

  updateMeetingStatus(meetingId: number, newStatus: string, userId: number): Observable<any> {
    return this.http.put(`${this.url}meeting/status/update/${meetingId}/${newStatus}/${userId}`, {})
      .pipe(catchError(err => this.base.errorHandler(err)));
  }

  deleteMeeting(meetingId: number, userId: number): Observable<any> {
    return this.http.delete(`${this.url}meeting/delete/${meetingId}/${userId}`)
      .pipe(catchError(err => this.base.errorHandler(err)));
  }



























  checkBalance(userId: number): Observable<any> {
    return this.http.get<any>(`${this.url}account/balance/${userId}`)
      .pipe(catchError((err) => this.base.errorHandler(err)));
  }

  getTransactions(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}account/transaction/${userId}`).pipe(
      catchError((err) => this.base.errorHandler(err)));
  }

  transfer(userId: number, amount: number, recipientAccountNumber: number): Observable<any> {
    const params = new HttpParams()
      .set('amount', amount)
      .set('recipient_account_number', recipientAccountNumber);

    return this.http.get<any>(`${this.url}account/transfer/${userId}`, { params })
      .pipe(catchError((err) => this.base.errorHandler(err)));
  }


  withdraw(userId: number, amount: number): Observable<any> {
    const params = new HttpParams()
      .set('amount', amount);
    return this.http.get<any>(`${this.url}account/withdraw/${userId}`, { params })
      .pipe(catchError((err) => this.base.errorHandler(err)));
  }

  deposit(userId: number, amount: number): Observable<any> {
    const params = new HttpParams()
      .set('amount', amount);
    return this.http.get<any>(`${this.url}account/deposit/${userId}`, { params })
      .pipe(catchError((err) => this.base.errorHandler(err)));
  }

  airtimeSelf(userId: number, amount: number): Observable<any> {
    const params = new HttpParams()
      .set('amount', amount);
    return this.http.get<any>(`${this.url}account/airtime_self/${userId}`, { params })
      .pipe(catchError((err) => this.base.errorHandler(err)));
  }

  airtimeOther(userId: number, amount: number, recipientPhoneNumber: string): Observable<any> {
    const params = new HttpParams()
      .set('amount', amount)
      .set('phone_no', recipientPhoneNumber);
    return this.http.get<any>(`${this.url}account/airtime_other/${userId}`, { params })
      .pipe(catchError((err) => this.base.errorHandler(err)));
  }
  buyDataSelf(userId: number, amount: number): Observable<any> {
    const params = new HttpParams()
      .set('amount', amount);
    return this.http.get<any>(`${this.url}account/buy_data_self/${userId}`, { params })
      .pipe(catchError((err) => this.base.errorHandler(err)));
  }

  // Method to buy data for others
  buyDataOther(userId: number, amount: number, recipientPhoneNumber: string): Observable<any> {
    const params = new HttpParams()
      .set('amount', amount)
      .set('phone_no', recipientPhoneNumber);
    return this.http.get<any>(`${this.url}account/buy_data_other/${userId}`, { params })
      .pipe(catchError((err) => this.base.errorHandler(err)));
  }

}
