import { Component, OnInit } from '@angular/core';
import { Event } from '../Modules/event.module';
import { EventsService } from '../Services/events.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  events: Event[];

  constructor(public eventsService: EventsService) { }

  ngOnInit() {
    this.eventsService.getEvents();
    this.eventsService.eventChanges
      .subscribe((events: Event[]) => {
        this.events = events;
      });
  }

}
