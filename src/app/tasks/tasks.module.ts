import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TaskListComponent } from './task-list/task-list.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { AngularMaterialModule } from '../angular-material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TaskListComponent,
    CreateTaskComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    CreateTaskComponent
  ]
})
export class TasksModule { }
