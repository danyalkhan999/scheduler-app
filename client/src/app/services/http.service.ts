import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Event } from '../models/event.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private apiUrl = 'http://localhost:3000/api/scheduler';

  http = inject(HttpClient);

  createEvent(event: Event) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/addEvent`, event, { headers });
  }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/getEvents`);
  }

  // Update event status
  updateEventStatus(id: string | undefined, status: string): Observable<Event> {
    return this.http.patch<Event>(`${this.apiUrl}/updateStatus/${id}`, {
      status,
    });
  }
}
