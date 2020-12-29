import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersService } from '../Services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  isMenuCollapsed = true;
  editMode = false;
  private userSubs: Subscription;

  constructor(private usersService: UsersService) { }

  ngOnInit(){
    this.editMode = this.usersService.getAuthentication();
    this.userSubs = this.usersService
      .getUserStatus()
      .subscribe(isAuthenticated => {
        this.editMode = isAuthenticated;
      });
  }

  ngOnDestroy(){
    this.userSubs.unsubscribe();
  }
}
