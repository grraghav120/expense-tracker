import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { BusinessDataService } from 'src/app/services/business-data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;
  constructor(
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    public route: Router,
    public businessData: BusinessDataService
  ) {}
  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      name: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      gmail: new FormControl('', [Validators.email, Validators.required]),
    });
  }
  onProceed() {
    this.authService.onSignUp(this.signUpForm.value).subscribe(
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
          this.route.navigate(['dashboard']);
        }
      },
      (error) => {
        this._snackBar.open('Email Already Exist ! Login Please', '', {
          duration: 5000,
        });
      }
    );
  }
}
