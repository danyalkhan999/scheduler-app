import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddNewEventComponent } from './components/add-new-event/add-new-event.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EventListComponent } from './components/event-list/event-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    AddNewEventComponent,
    CommonModule,
    HttpClientModule,
    EventListComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'client';
}
