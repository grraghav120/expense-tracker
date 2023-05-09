import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { BusinessDataService } from 'src/app/services/business-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // isLogging:boolean=false;
  loginForm!: FormGroup;
  constructor(
    public route: Router,
    public authService: AuthService,
    
  ) {}
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      gmail: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }
  res: any;
  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.onLogin(this.loginForm.value);
  }
}
