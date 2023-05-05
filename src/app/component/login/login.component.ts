import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BusinessDataService } from 'src/app/services/business-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // isLogging:boolean=false;
  loginForm!:FormGroup;
  constructor(public route:Router,public businessData:BusinessDataService){}
  ngOnInit(): void {
    // this.isLogging=this.businessData.isLogging;
    this.loginForm=new FormGroup({
      gmail:new FormControl('',[Validators.required,Validators.email]),
      pass:new FormControl('',Validators.required),
    })
  }

  onLogin(){
    if(this.loginForm.invalid){
      return;
    }
    this.businessData.isLogging=true;
    this.route.navigate(['welcome']);
    
  }

  onSignUp(){
    this.route.navigate(['signUp']);
  }

}
