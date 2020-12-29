import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators'

import { Event } from '../Modules/event.module';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  public events: Event[];
  public eventChanges = new Subject<Event[]>();
  
  constructor(private http: HttpClient) { }

  //get events from the database
  getEvents(){
    this.http.get<{message: string, events: any}>('http://localhost:3000/api/events')
      .pipe(map((eventdata) => {
        return eventdata.events.map(event => {
          return {
            id: event._id,
            eventName: event.eventName,
            imageLink: event.imageLink,
            startTime: event.startTime,
            endTime: event.endTime,
            date: event.data,
            addressLink: event.addressLink,
            address: event.address
          };
        });
      }))
      .subscribe((transformedEventData) => {
        this.events = transformedEventData;
        this.eventChanges.next([...this.events]);
      });
  }

  //add events to the database
  addEvent(event: Event){
    this.http.post<{message: string}>('http://localhost:3000/api/events', event)
      .subscribe(responseData => {
        console.log(responseData.message)
        this.events.push(event);
        this.eventChanges.next([...this.events])
      });
  }

  //delete events from the database
  deleteEvent(index: string){
    this.http.delete('http://localhost:3000/api/events/' + index)
      .subscribe(() => {
        const updatedEvents = this.events.filter(event => event.id !== index);
        this.events = updatedEvents;
        this.eventChanges.next([...this.events]);
      });
  }
}
