import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../Services/users.service';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }

  onLogin(){
    if(this.loginForm.invalid){
      return;
    }
    this.usersService.userLogin(this.loginForm.value.username, this.loginForm.value.password);
  }
}
