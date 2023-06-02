import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;
  SignUpContinue:boolean=false;
  constructor(
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    public route: Router
  ) {}
  ngOnInit(): void {
    this.SignUpContinue=false;
    this.signUpForm = new FormGroup({
      name: new FormControl('', [Validators.required,Validators.maxLength(50),Validators.pattern('^[a-zA-Z ]*$')]),
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required,Validators.minLength(8)]),
      gmail: new FormControl('', [Validators.email, Validators.required]),
    });
  }
  onProceed() {
    this.SignUpContinue=true;
    this.authService.onSignUp(this.signUpForm.value).then(()=>{
      this.SignUpContinue=false;
    }).catch((error:any) => {
      // Handle error response here
      this.SignUpContinue = false; // Enable the login button after error
    });
  }
}
