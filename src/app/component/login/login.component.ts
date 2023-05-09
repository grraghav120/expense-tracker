import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { BusinessDataService } from 'src/app/services/business-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // isLogging:boolean=false;
  loginForm!:FormGroup;
  constructor(public route:Router,public authService:AuthService,public _snackBar:MatSnackBar,public businessData:BusinessDataService){}
  ngOnInit(): void {
    this.loginForm=new FormGroup({
      gmail:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',Validators.required),
    })
  }

  onLogin(){
    if(this.loginForm.invalid){
      return;
    }
    this.authService.onLogin(this.loginForm.value).subscribe((res:any)=>{
      if(res){
        this._snackBar.open(res.message, '', { duration: 3000 });
        this.route.navigate(['dashboard']);
        this.businessData.latestLoginDate=res.data.latestLoginDate;
      }else{
        this._snackBar.open('Error Occurred', '', { duration: 3000 });
      }
    },(error)=>{
      // console.log(error);
      this._snackBar.open(error.error.message, '', { duration: 4000 });
    })
  }

}
