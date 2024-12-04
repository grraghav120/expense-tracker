import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
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
  queryPass:any;
  queryEmail:any;
  msg:any=null;

  constructor(
    public route: Router,
    public authService: AuthService,
    public busServ:BusinessDataService,
    public activateroute:ActivatedRoute
  ) {
    this.activateroute.queryParams.subscribe((p)=>{
      if((p['email']!=undefined || p['email']!=null) && (p['pass']!=undefined || p['pass']!=null)){
        this.queryEmail=p['email'];
        this.queryPass=p['pass'];
      }
    })
  }

  ngOnInit(): void {
    this.LoginContinue=false;
    this.loginForm = new FormGroup({
      gmail: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
    if(this.queryEmail!=undefined && this.queryPass!=undefined){
      if(this.queryEmail=='abc@gmail.com') this.msg="Please Wait.. Login Admin Account";
      this.onLogin('autoLogin');
    }
  }

  onLogin(wayToLogin:string) {
    if (wayToLogin==='default' && this.loginForm.invalid) {
      return;
    }
    if(wayToLogin=='autoLogin'){
      this.loginForm.setValue({gmail:this.queryEmail,password:this.queryPass});
    }
    this.LoginLogic(this.loginForm.value);
  }

  LoginLogic(body:any){
    this.LoginContinue=true;
    this.busServ.isChecking=true;
    this.authService.onLogin(body).then(() => {
      // Handle successful login
      this.LoginContinue = false; // Enable the login button after successful login
      this.busServ.isChecking=false;
      this.authService.saveSource(this.loginForm.value.gmail,'login',this.busServ.getComingSrc());
    })
    .catch((error:any) => {
      // Handle error response 
      this.LoginContinue = false; // Enable the login button after error
      this.busServ.isChecking=false;
    });
  }

}
