import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMeetStatusComponent } from './update-meet-status.component';

describe('UpdateMeetStatusComponent', () => {
  let component: UpdateMeetStatusComponent;
  let fixture: ComponentFixture<UpdateMeetStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateMeetStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMeetStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
