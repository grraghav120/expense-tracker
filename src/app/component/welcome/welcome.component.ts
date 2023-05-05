import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusinessDataService } from 'src/app/services/business-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit{

  constructor(public businesData:BusinessDataService,public route:Router){}
  ngOnInit(): void {
    
  }
  onSignUp(){
    this.route.navigate(['signUp']);
  }
}
