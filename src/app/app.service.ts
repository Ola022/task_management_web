import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CoreService } from './core/sevices/core.service';
import { CoreMainService } from './core-main/services/core-main.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    public coreService: CoreService,
    public coreMainService: CoreMainService,
    
    private router: Router,
    public snackbar: MatSnackBar,
    public dialog: MatDialog,
    
  ) { }

  public saveToStore(key: string, data: any) {    
    localStorage.setItem(key, JSON.stringify(data));
  }

  public removeFromStore(key: string) {
    localStorage.removeItem(key)
  }

  public getFromStore(key: string) {
    let store: any = localStorage.getItem(key);
    return JSON.parse(store)
  }

}
