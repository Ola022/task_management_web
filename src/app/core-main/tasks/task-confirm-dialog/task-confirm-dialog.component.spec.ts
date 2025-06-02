import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskConfirmDialogComponent } from './task-confirm-dialog.component';

describe('TaskConfirmDialogComponent', () => {
  let component: TaskConfirmDialogComponent;
  let fixture: ComponentFixture<TaskConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskConfirmDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
