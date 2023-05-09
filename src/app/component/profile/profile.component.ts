import { Component, OnInit } from '@angular/core';
import { BusinessDataService } from 'src/app/services/business-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  user_name:any='';
  name:any='';
  lines:any=[];
  constructor(public businessData:BusinessDataService){}
  ngOnInit(): void {
    this.name=this.businessData.name;
    this.user_name=this.businessData.username;
    this.lines=[
      {content:'User Since',text:this.businessData.firstLoginDate},
      {content:'Expense Logged',text:this.businessData.expensesLogged},
      {content:'Last Login',text:this.businessData.latestLoginDate}
    ];
  }
}
