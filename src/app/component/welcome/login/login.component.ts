import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { BusinessDataService } from 'src/app/services/business-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  LoginContinue:boolean=false;
  loginForm!: FormGroup;
  constructor(
    public route: Router,
    public authService: AuthService,
    public busServ:BusinessDataService
  ) {}
  ngOnInit(): void {
    this.LoginContinue=false;
    this.loginForm = new FormGroup({
      gmail: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }
  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }
    this.LoginContinue=true;
    this.busServ.isChecking=true;
    this.authService.onLogin(this.loginForm.value).then(() => {
      // Handle successful login
      this.LoginContinue = false; // Enable the login button after successful login
      this.busServ.isChecking=false;
    })
    .catch((error:any) => {
      // Handle error response 
      this.LoginContinue = false; // Enable the login button after error
      this.busServ.isChecking=false;
    });
  }
}
