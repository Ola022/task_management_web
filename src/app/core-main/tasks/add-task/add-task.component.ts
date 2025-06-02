import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent  implements OnInit {

  taskTitle: string = 'Add Task'; // Default task title
  action : string = 'Create Task'; // Default action is Add Task 
  isEditable : boolean = true
  constructor() { }
  @Input() taskID: number = 0;  // receives from parent
  @Output() public close: EventEmitter<any> = new EventEmitter<any>()
  


  ngOnInit(): void {
    if(this.taskID > 0) {
      this.taskTitle = 'Edit Task'; // Change title if taskID is provided
      this.action = 'Save Changes'; // Change action to Edit
      this.isEditable = false
    }
    console.log(this.taskID, this.isEditable)

  }

  closeComment() {
    this.close.emit()
  }
  allowEdit(){
    this.isEditable = true
  }
  currentUserName = 'Current User'; // Get from auth later
  users = ['Stewart Gauld', 'Jane Doe', 'John Tunde'];
  statuses = ['To Do', 'Pending', 'Blocked'];
  priorities = ['High', 'Medium', 'Low'];

  task = {
    title: '',
    description: '',
    reporter: '',
    assignee: this.currentUserName,
    status: 'To Do',
    priority: 'Medium',
    label: 'Task',
    storyPoints: ''
  };

  addTask() {
    console.log(this.task);
    // Add to your service or emit output
  }
}
