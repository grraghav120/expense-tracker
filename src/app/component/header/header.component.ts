import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
import { AuthService } from 'src/app/auth/auth.service';
import { AlertBoxComponent } from '../alert-box/alert-box.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  isLogging:boolean=true;
  constructor(private route:Router,public dialog: MatDialog,public authService:AuthService){}
  ngOnInit(): void {
    const token=localStorage.getItem('LEAD_ID');
    this.authService.authAfterReferesh(true,token);
  }
  openDialog(): void {
    this.dialog.open(ProfileComponent, {
      width: '600px',
    })
  }
  onView(){
    this.route.navigate(['dashboard']);
  }
  onLogout(){
    // this.authService.onLogout();
    this.dialog.open(AlertBoxComponent, {
      // width: '600px',
      // height: '500px',
    });
  }
}
