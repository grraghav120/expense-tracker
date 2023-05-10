import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
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
  constructor(public businessData:BusinessDataService,public authService:AuthService){}
  ngOnInit(): void {
    this.authService.getAllSaveData().subscribe((res:any)=>{
      console.log(res);
      
      this.lines=[
        {content:'User Since',text:res.data.firstLoginDate},
        {content:'Expense Logged',text:this.businessData.expensesLogged},
        {content:'Last Login',text:res.data.lastLoginDate}
      ];
      this.name=res.data.name;
      this.user_name=res.data.username;
    })
  }
}
