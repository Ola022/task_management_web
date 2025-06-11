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
// 1. Create a new task
createTask(userId: number, data: any): Observable<any> {
  return this.http.post<any>(`${this.url}task/create/${userId}`, data)
    .pipe(catchError(err => this.base.errorHandler(err)));
}

// 2. Get tasks by status
getTasksByStatus(status: string, userId: number): Observable<any> {
  return this.http.get<any>(`${this.url}task/status/${status}/${userId}`)
    .pipe(catchError(err => this.base.errorHandler(err)));
}

// 3. Get tasks assigned to the current user
getMyTasks(userId: number): Observable<any> {
  return this.http.get<any>(`${this.url}task/mine/${userId}`)
    .pipe(catchError(err => this.base.errorHandler(err)));
}
getAllTasks(userId: number): Observable<any> {
  return this.http.get<any>(`${this.url}task/all/${userId}`)
    .pipe(catchError(err => this.base.errorHandler(err)));
}

// 4. Get tasks by type
getTasksByType(taskType: string, userId: number): Observable<any> {
  return this.http.get<any>(`${this.url}task/type/${taskType}/${userId}`)
    .pipe(catchError(err => this.base.errorHandler(err)));
}

// 5. Get task detail
getTaskDetail(taskId: number, userId: number): Observable<any> {
  return this.http.get<any>(`${this.url}task/detail/${taskId}/${userId}`)
    .pipe(catchError(err => this.base.errorHandler(err)));
}

// 6. Update task
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

  































  checkBalance(userId: number): Observable<any> {
    return this.http.get<any>(`${this.url}account/balance/${userId}`)
      .pipe(catchError((err) => this.base.errorHandler(err)));
  }

  getTransactions(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}account/transaction/${userId}`).pipe(
      catchError((err) =>  this.base.errorHandler(err)));
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
    return this.http.get<any>(`${this.url}account/airtime_other/${userId}`, { params})
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
