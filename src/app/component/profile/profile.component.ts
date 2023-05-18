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
  editable:boolean=false;
  isProcess:boolean=true;
  name:any='';
  lines:any=[];
  constructor(public businessData:BusinessDataService,public authService:AuthService){}
  ngOnInit(): void {
    this.isProcess=true;
    this.authService.getAllSaveData().subscribe((res:any)=>{
      setTimeout(() => {
        this.isProcess=false;
        this.editable=true;
      }, 2000);
      let firstDate=(res.data.firstLoginDate).toString().split('T')[0];
      let lastLogin=(res.data.lastLoginDate).toString().split('T')[0];
      this.lines=[
        {content:'User Since',text:firstDate},
        {content:'Expense Logged',text:res.data.expenseLogged},
        {content:'Last Login',text:lastLogin},
      ];
      this.name=res.data.name;
      this.user_name=res.data.username;
    })
  }
}
