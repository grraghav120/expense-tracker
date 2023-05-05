import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BusinessDataService } from 'src/app/services/business-data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{
  signUpForm!:FormGroup;
  constructor(private businessData:BusinessDataService){}
  ngOnInit(): void {
    this.signUpForm=new FormGroup({
      name:new FormControl('',Validators.required),
      username:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required),
      gmail:new FormControl('',[Validators.email,Validators.required]),
    })
  }
  onProceed(){
    // console.log(this.signUpForm);
    this.businessData.onSignUp(this.signUpForm.value);
  }
}

