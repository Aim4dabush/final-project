import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  newUserForm: FormGroup;

  constructor(public usersService: UsersService) { }

  ngOnInit() {
    this.newUserForm = new FormGroup({
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }

  onSave() {
    if(this.newUserForm.invalid){
      return;
    }
    this.usersService.createUser(this.newUserForm.value.username, this.newUserForm.value.password);
    this.newUserForm.reset();
  }
}
