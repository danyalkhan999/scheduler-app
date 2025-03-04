import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewEventComponent } from './add-new-event.component';

describe('AddNewEventComponent', () => {
  let component: AddNewEventComponent;
  let fixture: ComponentFixture<AddNewEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
