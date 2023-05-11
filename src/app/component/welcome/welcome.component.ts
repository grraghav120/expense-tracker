import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit{
  isLogging:boolean=true;
  constructor(public authService:AuthService,public _snackBar : MatSnackBar){}
  ngOnInit(): void {
    this.isLogging=true;
    const LoggedUser=localStorage.getItem('LEAD_ID');
    if(LoggedUser){
      this.authService.onLogout();
      this.isLogging=true;
      this._snackBar.open('You have Logout Successfully','',{duration:3000});
    }
  }
  onSignUp(){
    this.isLogging=false;
  }
  onLogin(){
    this.isLogging=true;
  }

}
