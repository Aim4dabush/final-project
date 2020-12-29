import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from '../Modules/user.module';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private isAuthenticated = false;
  private token: string;
  private userStatus = new Subject<boolean>();
  private tokenTimer: any;
  
  constructor(private http: HttpClient, private router: Router) { }

  getToken(){
    return this.token;
  }

  getUserStatus(){
    return this.userStatus.asObservable();
  }

  getAuthentication(){
    return this.isAuthenticated;
  }

  createUser(username: string, password: string){
    const userData: User = {username: username, password: password};
    this.http.post('http://localhost:3000/api/user/signup', userData)
      .subscribe(response => {
        console.log(response);
      });
  }

  userLogin(username: string, password: string){
    const userData: User = {username: username, password: password};
    this.http.post<{token: string, expiresIn: number}>('http://localhost:3000/api/user/login', userData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userStatus.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration *1000);
          console.log(expirationDate);
          this.saveUserData(token, expirationDate);
          this.router.navigate(['/edit'])
        }
      });
  }

  autoAuthUser() {
    const userInforamtion = this.getUserData();
    if (!userInforamtion) {
      return;
    }
    const now = new Date();
    const expiresIn = userInforamtion.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = userInforamtion.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn/1000);
      this.userStatus.next(true);
    }
  }

  logout(){
    this.token = null;
    this.isAuthenticated = false;
    this.userStatus.next(false);
    clearTimeout(this.tokenTimer);
    this.clearUserData();
    this.router.navigate(['/']);
  }

  private setAuthTimer(duration: number){
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveUserData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString())
  }

  private clearUserData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private getUserData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token && !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }
}
