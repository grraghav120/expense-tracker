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
    public route: Router
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
    this.authService.onSignUp(this.signUpForm.value).subscribe((res: any) => {   
      if (res.error.error.length === 0) {
        this._snackBar.open(
          'Expense Tracker Account Created SuccessFully',
          '',
          { duration: 2000 }
        );
        this.route.navigate(['dashboard']);
      } else {
        this._snackBar.open('Error Occurred!!', '', {
          duration: 2000,
        });
        // this.onReset();
      }
    },(error)=>{
      // console.log(error.error.error);
      
      if (Object.keys(error.error.error).length === 0) {
        this._snackBar.open(
          'Expense Tracker Account Created SuccessFully',
          '',
          { duration: 2000 }
        );
        this.route.navigate(['dashboard']);
      } else {
        this._snackBar.open('Email Already Exist ! Login Please', '', {
          duration: 5000,
        });
        // this.route.navigate(['welcome']);
      }
    }
    )
  }
}
