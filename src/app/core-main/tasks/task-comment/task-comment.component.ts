import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-task-comment',
  templateUrl: './task-comment.component.html',
  styleUrl: './task-comment.component.scss'
})
export class TaskCommentComponent {
constructor() { }
  @Input() taskID: number = 0;  // receives from parent
  @Output() public close: EventEmitter<any> = new EventEmitter<any>()
  
   closeComment() {
    this.close.emit()
  }

  currentUser = 'Seyi Gabriel'; // or get from auth
  newMessage = '';

  messages = [
    { sender: 'John Doe', text: 'Hey, how are you?', time: '2:30 PM' },
    { sender: 'Seyi Gabriel', text: 'I’m good, just working on the new UI.', time: '2:31 PM' }
  ];

  sendMessage() {
    if (!this.newMessage.trim()) return;

    this.messages.push({
      sender: this.currentUser,
      text: this.newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    this.newMessage = '';
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }
}
