import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  createTaskData:any;
  createTaskForm!: FormGroup;
  formControl = new FormControl('', [
    Validators.required
  ]);
  projectList = [
    "Project 1",
    "Project 2",
    "Project 3"
  ]
  constructor( @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<CreateTaskComponent>) {
    this.createTaskData =data;
   }

  ngOnInit(): void {
    this.createTaskForm = new FormGroup({
      task_name: new FormControl('',Validators.required),
      project: new FormControl('',Validators.required),
      comments: new FormControl('')
    });
    if(this.createTaskData){
      console.log(this.createTaskData)
      this.createTaskForm.patchValue({
        task_name: this.createTaskData.task_name,
      project: this.createTaskData.project,
      comments:this.createTaskData.comments
      })
    }
  }

  create(){
    let taskList=[];
      let tasklistItems:any = localStorage.getItem('taskList');
      tasklistItems = JSON.parse(tasklistItems);
      taskList =tasklistItems? tasklistItems: [];
    if(!this.createTaskData?.task_id){ 
      let request = {
        "task_id": taskList?.length +1,
        "task_name": this.createTaskForm.get('task_name')?.value,
        "project": this.createTaskForm.get('project')?.value,
        "comments": this.createTaskForm.get('comments')?.value
      }
      taskList.push(request);
    }else{
      let request = {
        "task_id": this.createTaskData?.task_id,
        "task_name": this.createTaskForm.get('task_name')?.value,
        "project": this.createTaskForm.get('project')?.value,
        "comments": this.createTaskForm.get('comments')?.value
      };
      let task = taskList?.filter((x:any) => x.task_id == this.createTaskData.task_id);
      let index = taskList.indexOf(task[0],0);
      if (index > -1) {
        taskList.splice(index, 1);
     }
     taskList.push(request);
    }
    
    localStorage.setItem('taskList',JSON.stringify(taskList));
  }

  cancel(){
    this.createTaskForm.reset();
  }

  backClick(){

  }

}
