import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-alert-box',
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.scss']
})
export class AlertBoxComponent implements OnInit{

  constructor(public authService:AuthService){}
  ngOnInit(): void {
      
  }

  onLogout(){
    this.authService.onLogout();
  }


}
