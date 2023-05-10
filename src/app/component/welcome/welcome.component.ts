import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit{
  isLogging:boolean=true;
  constructor(public authService:AuthService){}
  ngOnInit(): void {
    this.isLogging=true;
    const LoggedUser=localStorage.getItem('LEAD_ID');
    if(LoggedUser){
      this.authService.onLogout();
    }
  }
  onSignUp(){
    this.isLogging=false;
  }
  onLogin(){
    this.isLogging=true;
  }

}
