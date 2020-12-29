import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutUsComponent } from './about-us/about-us.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { AuthGuard } from './auth.guard';
import { EditEventsComponent } from './edit/edit-events/edit-events.component';
import { EditUserComponent } from './edit/edit-user/edit-user.component';
import { EditComponent } from './edit/edit.component';
import { EventComponent } from './event/event.component';
import { GivingComponent } from './giving/giving.component';
import { HomeComponent } from './home/home.component';
import { PrayerRequestComponent } from './prayer-request/prayer-request.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'events', component: EventComponent},
  {path: 'giving', component: GivingComponent},
  {path: 'prayer-request', component: PrayerRequestComponent},
  {path: 'administrator', component: AdministratorComponent},
  {path: 'edit', component: EditComponent, canActivate: [AuthGuard],  children: [
    {path: 'edit-events', component: EditEventsComponent},
    {path: 'edit-user', component: EditUserComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
