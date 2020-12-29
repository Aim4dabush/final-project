import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Event } from 'src/app/Modules/event.module';
import { EventsService } from 'src/app/Services/events.service';

@Component({
  selector: 'app-edit-events',
  templateUrl: './edit-events.component.html',
  styleUrls: ['./edit-events.component.css']
})
export class EditEventsComponent implements OnInit, OnDestroy{
  eventForm: FormGroup;
  events: Event[];
  eventSub: Subscription;

  constructor(public eventsService: EventsService) { }

  ngOnInit() {
    this.eventForm = new FormGroup({
      'eventName': new FormControl('', Validators.required),
      'imageLink': new FormControl('', Validators.required),
      'startTime': new FormControl('', Validators.required),
      'endTime': new FormControl('', Validators.required),
      'date': new FormControl('', Validators.required),
      'addressLink': new FormControl('', Validators.required),
      'address': new FormControl('', Validators.required)
    });
    this.eventsService.getEvents();
    this.eventSub = this.eventsService.eventChanges.subscribe(
      (events: Event[]) => {
        this.events = events;
      }
    );
  }

  onAdd(){
    this.eventsService.addEvent(this.eventForm.value);
    this.eventForm.reset();
  }

  onDelete(index: string){
    this.eventsService.deleteEvent(index);
  }

  ngOnDestroy(){
    this.eventSub.unsubscribe();
  }
}
