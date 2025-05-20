import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetPasswordComponent } from './core/forget-password/forget-password.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./core/core.module').then(m => m.coreModule)
  },

  {
    path: 'app',
    loadChildren: () => import('./core-main/core-main.module').then(m => m.CoreMainModule),    
  },

  {
    path: 'forget-pass',
    component: ForgetPasswordComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
