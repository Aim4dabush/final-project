import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PrayerRequest } from '../Modules/prayer-request.module';

@Injectable({
  providedIn: 'root'
})
export class PrayerRequestService {

  constructor(private http: HttpClient) { }

  sendMail(prayerRequest: PrayerRequest){
    this.http.post<{ message: string }>('http://localhost:3000/api/prayer-request', prayerRequest)
      .subscribe(data => {
        console.log(data.message);
      })
  }
}
