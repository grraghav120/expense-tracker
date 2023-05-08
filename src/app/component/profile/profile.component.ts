import { Component, OnInit } from '@angular/core';
import { BusinessDataService } from 'src/app/services/business-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  user_name:any='raghav';
  name:any='Raghav Garg'
  expenseLogged: string='';
  text1:any='';
  text3:any='';
  lines:any=[];
  constructor(public businessData:BusinessDataService){}
  ngOnInit(): void {
    this.expenseLogged=this.businessData.expensesLogged;
    this.lines=[
      {content:'User Since',text:''},
      {content:'Expense Logged',text:this.expenseLogged},
      {content:'Last Login',text:this.text3}
    ];
  }
}
