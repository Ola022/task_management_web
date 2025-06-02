import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-meets',
  templateUrl: './add-meets.component.html',
  styleUrl: './add-meets.component.scss'
})
export class AddMeetsComponent {

  meeting = {
    title: '',
    organizer: '',
    participants: [] as string[],
    dateOnly: '',
    timeOnly: '',
    locationType: 'online',
    url: '',
    venue: '',
    agenda: '',
    status: 'Upcoming'
  };

  taskTitle: string = 'Schedule Meeting'; // Default task title
  action: string = 'Create Meet'; // Default action is Add Task 
  isEditable: boolean = true
  constructor() { }
  @Input() MeetID: number = 0;  // receives from parent
  @Output() public close: EventEmitter<any> = new EventEmitter<any>()



  ngOnInit(): void {
    if (this.MeetID > 0) {
      this.taskTitle = 'Edit Meet'; // Change title if taskID is provided
      this.action = 'Save Changes'; // Change action to Edit      

      this.meeting = {
        title: 'Team Sync Meeting',
        organizer: 'Jane Doe',
        participants: ['Alex', 'Mary', 'John'],
        dateOnly: '15:30:00',
        timeOnly: '2025-06-01',
        agenda: 'Review project status and blockers.',
        locationType: 'online',
        url: 'https://meet.google.com/abc-defg',
        status: 'Upcoming',
        venue: 'Main Office, 3rd Floor' // used if offline
      };

    }
    console.log(this.MeetID, this.isEditable)

  }

  closeComment() {
    this.close.emit()
  }
  users: string[] = ['Jane Doe', 'Alex', 'Mary', 'John', 'Victor', 'Zara'];
  allSelected = false;

  toggleAllSelection() {
    if (this.allSelected) {
      this.meeting.participants = [];
    } else {
      this.meeting.participants = [...this.users];
    }
    this.allSelected = !this.allSelected;
  }

  toggleSelectAll() {
    this.allSelected = this.meeting.participants.length === this.users.length;
  }
  submitMeeting() {
    const datetime = this.combineDateAndTime(this.meeting.dateOnly, this.meeting.timeOnly);
    const finalMeeting = {
      ...this.meeting,
    };

    console.log('Meeting submitted:', finalMeeting);
    // You can now send this to your backend or use it however needed
  }

  combineDateAndTime(date: string, time: string): string {
    return `${date}T${time}`;
  }


}
