import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLoaderComponent } from './page-loader/page-loader.component';
import { materials } from './angular-material/material.modules';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TaskCommentComponent } from '../core-main/tasks/task-comment/task-comment.component';



@NgModule({
  declarations: [
    PageLoaderComponent,
    TaskCommentComponent,
  ],

  imports: [    
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ...materials,
    HttpClientModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ...materials,
    HttpClientModule,
    PageLoaderComponent,
    TaskCommentComponent,
  ]
})


export class SharedModule { 
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: SharedModule
    };
  }
}
