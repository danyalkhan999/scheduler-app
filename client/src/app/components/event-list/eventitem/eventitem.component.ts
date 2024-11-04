import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Event } from '../../../models/event.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-eventitem',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eventitem.component.html',
  styleUrl: './eventitem.component.css',
})
export class EventitemComponent {
  @Input() event!: Event;
  @Output() statusChange = new EventEmitter<string>();

  // Emit the status change event
  changeStatus(status: string) {
    this.statusChange.emit(status);
  }

  // Get color based on status
  getStatusColor(): string {
    switch (this.event.status) {
      case 'scheduled':
        return 'yellow';
      case 'completed':
        return 'green';
      case 'cancelled':
        return 'red';
      default:
        return 'white';
    }
  }
}
