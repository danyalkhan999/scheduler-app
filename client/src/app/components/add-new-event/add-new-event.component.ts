import { HttpService } from './../../services/http.service';
import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/event.model';

import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { timeMismatchValidator } from '../../validators/time.validator';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-add-new-event',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-new-event.component.html',
  styleUrl: './add-new-event.component.css',
})
export class AddNewEventComponent implements OnInit {
  event: Event = { name: '', start_time: 0, end_time: 0, status: 'scheduled' };
  eventForm!: FormGroup;
  message: String = '';

  constructor(private httpService: HttpService) {
    this.eventForm = new FormGroup(
      {
        name: new FormControl('', [Validators.required]),
        start_time: new FormControl(null, [
          Validators.required,
          Validators.min(0),
          Validators.max(23),
        ]),
        end_time: new FormControl(null, [
          Validators.required,
          Validators.min(0),
          Validators.max(23),
        ]),
      },
      { validators: timeMismatchValidator }
    );

    this.eventForm.controls['start_time'].valueChanges
      .pipe(
        debounceTime(300) // Adjust the debounce time as needed
      )
      .subscribe(() => {
        this.eventForm.updateValueAndValidity();
      });

    this.eventForm.controls['end_time'].valueChanges
      .pipe(debounceTime(300))
      .subscribe(() => {
        this.eventForm.updateValueAndValidity();
      });
  }

  ngOnInit(): void {
    console.log('fgyutgjhugvjhgvhjgv', this.eventForm.errors?.['timeMismatch']);
  }

  scheduleEvent() {
    console.log(this.eventForm);
    if (this.eventForm.valid) {
      const eventData: Event = {
        name: this.eventForm.value.name,
        start_time: this.eventForm.value.start_time,
        end_time: this.eventForm.value.end_time,
        status: 'scheduled',
      };
      this.httpService.createEvent(eventData).subscribe(
        (res) => {
          console.log(res);
          this.message = 'Event scheduled successfully!';
          this.eventForm.reset();
        },
        (err) => {
          this.message = 'Failed to schedule event. Please try again.';
        }
      );
    }
  }
}
