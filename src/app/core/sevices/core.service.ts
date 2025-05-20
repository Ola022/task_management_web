import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { BaseUrlService } from '../../base/base-url.service';
import { Signup } from '../core.model';


@Injectable({
  providedIn: 'root'
})
export class CoreService {
  
  url: string = this.base._baseUrl;

  constructor(private http: HttpClient, private base: BaseUrlService) { }

  SignIn(email: string, password: string ): Observable<any> {
    return this.http
      .get<any>(this.url + `user/login?email=${email}&password=${password}`)
      .pipe(catchError((err) => this.base.errorHandler(err)));
  }

  signUp(payload: Signup) {
    return this.http
      .post(this.url + `user/signup`, payload)
      .pipe(catchError((err) => this.base.errorHandler(err)));
  }
}
