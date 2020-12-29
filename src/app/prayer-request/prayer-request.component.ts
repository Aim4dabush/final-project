import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PrayerRequestService } from '../Services/prayer-request.service';

@Component({
  selector: 'app-prayer-request',
  templateUrl: './prayer-request.component.html',
  styleUrls: ['./prayer-request.component.css']
})
export class PrayerRequestComponent implements OnInit {
  prayerForm: FormGroup;

  constructor(private prayerRequestService: PrayerRequestService) { }

  ngOnInit() {
    this.prayerForm = new FormGroup({
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'phoneNumber': new FormControl('', [Validators.required]),
      'request': new FormControl('', Validators.required),
      'requestDetails': new FormControl('', Validators.required)
    })
  }

  onSubmit(){
    this.prayerRequestService.sendMail(this.prayerForm.value);
    this.prayerForm.reset();
  }
}
