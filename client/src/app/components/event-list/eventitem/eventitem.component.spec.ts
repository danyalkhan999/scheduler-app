import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventitemComponent } from './eventitem.component';

describe('EventitemComponent', () => {
  let component: EventitemComponent;
  let fixture: ComponentFixture<EventitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventitemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
