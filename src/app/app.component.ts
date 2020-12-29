import { Component, OnInit } from '@angular/core';
import { UsersService } from './Services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'citychurch';

  constructor(private usersService: UsersService){}

  ngOnInit(){
    this.usersService.autoAuthUser();
  }
}
