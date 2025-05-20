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
