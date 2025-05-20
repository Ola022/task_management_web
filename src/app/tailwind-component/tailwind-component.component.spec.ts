import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TailwindComponentComponent } from './tailwind-component.component';

describe('TailwindComponentComponent', () => {
  let component: TailwindComponentComponent;
  let fixture: ComponentFixture<TailwindComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TailwindComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TailwindComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
