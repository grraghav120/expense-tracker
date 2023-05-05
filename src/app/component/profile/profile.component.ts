import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user_name:any='raghav';
  text1:any='';
  text2:any='';
  text3:any='';
  lines=[
    {content:'User Since',text:this.text1},
    {content:'Expense Logged',text:this.text2},
    {content:'Last Login',text:this.text2}
  ]
}
