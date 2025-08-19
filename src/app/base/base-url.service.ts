import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseUrlService {
//_baseUrl: string = 'https://fastapi-practice-d34t.onrender.com/'
//_baseUrl: string = 'https://fastapi-practice-d34t.onrender.com/'
//_baseUrl: string = "http://localhost:4200"
//_baseUrl: string = 'http://127.0.0.1:8000/'
_baseUrl: string = 'https://taskmanagementwebapps.netlify.app/'

  constructor() { }

  errorHandler(err: HttpErrorResponse) {
    let errorMessage: string;
       if (err.error) {
         errorMessage = `${err.error?.data}`;
       } else {
         errorMessage = `${err.statusText}`;
       }
       return throwError(() => new Error(errorMessage));
     }
}
