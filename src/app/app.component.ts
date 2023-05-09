import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'expense-tracker';
  constructor(public authService:AuthService){}
  ngOnInit(): void {
    const localToken=localStorage.getItem('LEAD_ID');
    if(localToken){
      this.authService.authAfterReferesh(true,localToken);
    }
  }
}
