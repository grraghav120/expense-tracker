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
  constructor(
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    public route: Router
  ) {}
  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      name: new FormControl('', [Validators.required,Validators.maxLength(50),Validators.pattern('^[a-zA-Z ]*$')]),
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required,Validators.minLength(8)]),
      gmail: new FormControl('', [Validators.email, Validators.required]),
    });
  }
  onProceed() {
    this.authService.onSignUp(this.signUpForm.value);
  }
}
