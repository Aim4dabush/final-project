import { Component } from '@angular/core';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-edit-header',
  templateUrl: './edit-header.component.html',
  styleUrls: ['./edit-header.component.css']
})
export class EditHeaderComponent {
  isMenuCollapsed = true;

  constructor(private usersService: UsersService) { }

  onLogout(){
    this.usersService.logout();
  }
}
