import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CreateTaskComponent } from '../create-task/create-task.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
public listingData = [];
public searchText!: string;
public activePage: any = 1;
public total_count: any;
public dataSource!: MatTableDataSource<any>;
public ordering: string = "-id"
public pageSize: number = 10;
public filter: any;
public displayedColumns: string[] = [
  "task_id","task_name","project","comments","task_edit","task_delete"
];

constructor(private dialog: MatDialog) {
}

/**ng on init */
ngOnInit(): void {
  this.dataSource = new MatTableDataSource();
  this.getPage();
}


/**get list from api */
getPage() {
  this.dataSource.data = [];
  let tasklistItems:any = localStorage.getItem('taskList');
    tasklistItems = JSON.parse(tasklistItems);
    this.dataSource.data =tasklistItems? tasklistItems: [];
}

/**on chnage page from paginations */
onPageChange(event: PageEvent) {
  this.activePage = event.pageIndex + 1;
  this.pageSize = event.pageSize;
  this.getPage();
}

onSortColumn(event:any) {
  this.ordering = (event.direction == "asc") ? event.active : ("-" + event.active);
  this.getPage();
}

edit(row:any){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  dialogConfig.autoFocus = true;
  dialogConfig.panelClass = 'my-class'; 
  dialogConfig.width = '900px';
  dialogConfig.data = row;
  let dialogRef = this.dialog.open(CreateTaskComponent, dialogConfig);
  dialogRef.afterClosed().subscribe(val => {
    this.getPage();
  })
}

delete(row:any){
  let taskList = this.dataSource?.data;
  let task = taskList?.filter((x:any) =>  x.task_id == row.task_id);
      let index = taskList.indexOf(task[0],0);
      if (index > -1) {
        taskList.splice(index, 1);
     }
     localStorage.setItem('taskList',JSON.stringify(taskList));
  this.dataSource.data = taskList;
}

create(){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  dialogConfig.autoFocus = true;
  dialogConfig.panelClass = 'my-class'; 
  dialogConfig.width = '900px';
  dialogConfig.data = {
  };
  const dialogRef = this.dialog.open(CreateTaskComponent, dialogConfig);
  dialogRef.afterClosed().subscribe(val => {
    this.getPage();
  })
}  
}
