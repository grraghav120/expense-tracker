import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusinessDataService } from 'src/app/services/business-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit{
  isLogging:boolean=true;
  constructor(public businesData:BusinessDataService,public route:Router){}
  ngOnInit(): void {
    this.isLogging=true;
  }
  onSignUp(){
    // this.route.navigate(['signUp']);
    this.isLogging=false;
  }
  onLogin(){
    this.isLogging=true;
  }
}
