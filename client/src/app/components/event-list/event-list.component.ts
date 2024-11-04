import { Component, inject, OnInit } from '@angular/core';
import { Event } from '../../models/event.model';
import { HttpService } from '../../services/http.service';
import { CommonModule } from '@angular/common';
import { EventitemComponent } from './eventitem/eventitem.component';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, EventitemComponent],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css',
})
export class EventListComponent implements OnInit {
  events: Object[] = [];
  httpService = inject(HttpService);

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    // call get api for events
    this.httpService
      .getEvents()
      .subscribe((ev) => (this.events = [...this.events, ev.events]));
  }

  // Update event status
  updateEventStatus(event: Event, status: string): void {
    // this.httpService
    //   .updateEventStatus(event._id, status)
    //   .subscribe((updatedEvent) => {
    //     event.status = updatedEvent.status;
    //   });
  }
}
