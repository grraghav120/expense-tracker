import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserData } from '../component/signup/signup.model';
import { BusinessDataService } from '../services/business-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'http://localhost:3000/v1/api/';
  private isAuth: boolean = false;
  private token!: any;
  private expireTokenTime: any;
  constructor(
    public http: HttpClient,
    public _snackBar: MatSnackBar,
    public businessData: BusinessDataService,
    public route: Router
  ) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuth;
  }

  onSignUp(values: any) {
    let body = {
      name: values.name,
      username: values.username,
      gmail: values.gmail,
      password: values.password,
      userFirstSignUp: new Date(),
    };
    this.http.post(this.apiUrl + 'USER/SIGN_UP', body).subscribe(
      (res: any) => {
        if (res) {
          this._snackBar.open(
            'Expense Tracker Account Created SuccessFully',
            '',
            { duration: 4000 }
          );
          this.businessData.firstLoginDate = res.data.UserSince;
          this.businessData.username = res.data.username;
          this.businessData.name = res.data.name;
          this.token = res.data.token;
          this.expireTokenTime = setTimeout(() => {
            this.onLogout();
          }, res.data.expiredToken * 1000);
          this.isAuth = true;
          this.route.navigate(['dashboard']);
        }
      },
      (error) => {
        this._snackBar.open('Email Already Exist ! Login Please', '', {
          duration: 5000,
        });
        this.isAuth = false;
      }
    );
  }

  onLogin(body: any) {
    this.http.post(this.apiUrl + 'USER/LOGIN', body).subscribe(
      (res: any) => {
        this._snackBar.open(res.message, '', { duration: 3000 });
        this.businessData.latestLoginDate = res.data.latestLoginDate;
        this.token = res.data.token;
        this.isAuth = true;
        this.expireTokenTime = setTimeout(() => {
          this.onLogout();
        }, res.data.expiredToken * 1000);
        this.route.navigate(['dashboard']);
      },
      (error) => {
        this._snackBar.open(error.error.message, '', { duration: 3000 });
        this.isAuth = false;
      }
    );
  }

  onLogout() {
    this.token = null;
    this.isAuth = false;
    this.route.navigate(['welcome']);
    clearTimeout(this.expireTokenTime);
  }
}
