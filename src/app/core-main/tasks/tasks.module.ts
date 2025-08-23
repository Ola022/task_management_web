import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AddTaskComponent } from './add-task/add-task.component';

import { TaskConfirmDialogComponent } from './task-confirm-dialog/task-confirm-dialog.component';
import { ProjectComponent } from './project/project.component';
import { AddProjectComponent } from './project/add-project/add-project.component';

export const tasksRoutes: Routes = [
  {
    path: '',
    component: ProjectComponent
  },
  {
    path: 'tasks/:id',
    component: TasksComponent
  },
];


@NgModule({
  declarations: [
    TasksComponent,
    AddTaskComponent,
    
    TaskConfirmDialogComponent,
          ProjectComponent,
          AddProjectComponent
  ],
  imports: [
    CommonModule,    
    SharedModule,
    RouterModule.forChild(tasksRoutes)
  ]
})


export class TasksModule { }
