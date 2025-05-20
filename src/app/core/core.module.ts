import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { ForgetPasswordComponent } from "./forget-password/forget-password.component";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { LoginPageComponent } from './login-page/login-page.component';

export const coreRoutes: Routes = [
  {
    path: '',
    component: LoginPageComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'forget-pass',
    component: ForgetPasswordComponent
  }
  ];

  @NgModule({
    declarations: [        
        ForgetPasswordComponent,
        LoginPageComponent,
    ],
    
    imports: [
      CommonModule,
      SharedModule,
      RouterModule.forChild(coreRoutes)
    ]
  })
  
  export class coreModule { }