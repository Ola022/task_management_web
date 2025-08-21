import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VConfirmationComponent } from './v-confirmation.component';

describe('VConfirmationComponent', () => {
  let component: VConfirmationComponent;
  let fixture: ComponentFixture<VConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
