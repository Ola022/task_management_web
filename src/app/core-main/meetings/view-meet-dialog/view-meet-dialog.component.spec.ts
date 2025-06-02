import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMeetDialogComponent } from './view-meet-dialog.component';

describe('ViewMeetDialogComponent', () => {
  let component: ViewMeetDialogComponent;
  let fixture: ComponentFixture<ViewMeetDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewMeetDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMeetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
