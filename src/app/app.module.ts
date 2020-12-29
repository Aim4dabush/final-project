import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { EventComponent } from './event/event.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { GivingComponent } from './giving/giving.component';
import { PrayerRequestComponent } from './prayer-request/prayer-request.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { EditComponent } from './edit/edit.component';
import { EditHeaderComponent } from './edit/edit-header/edit-header.component';
import { EditEventsComponent } from './edit/edit-events/edit-events.component';
import { EditUserComponent } from './edit/edit-user/edit-user.component';
import { UserInterceptor } from './user-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    EventComponent,
    AboutUsComponent,
    GivingComponent,
    PrayerRequestComponent,
    AdministratorComponent,
    EditComponent,
    EditHeaderComponent,
    EditEventsComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: UserInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
