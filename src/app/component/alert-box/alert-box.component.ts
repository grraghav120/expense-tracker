import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-alert-box',
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.scss']
})
export class AlertBoxComponent implements OnInit{
  type:any;
  constructor(public authService:AuthService,@Inject(MAT_DIALOG_DATA) public data: any){}
  ngOnInit(): void {
      this.type=this.data.type;
  }

  onLogout(){
    this.authService.onLogout();
  }


}
