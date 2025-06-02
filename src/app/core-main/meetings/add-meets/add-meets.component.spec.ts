import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMeetsComponent } from './add-meets.component';

describe('AddMeetsComponent', () => {
  let component: AddMeetsComponent;
  let fixture: ComponentFixture<AddMeetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddMeetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMeetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
