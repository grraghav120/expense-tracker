import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
import { BusinessDataService } from 'src/app/services/business-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  isLogging:any;
  constructor(private route:Router,public dialog:MatDialog,public businessData:BusinessDataService){}
  ngOnInit(): void {
    this.isLogging=this.businessData.isLogging;
  }
  onSignUp(){
    this.route.navigate(['signUp']);
  }
  onAdd(){
    this.route.navigate(['dashboard']);
  }
  Profile(){
    this.openDialog();
  }
  openDialog(): void {
    this.dialog.open(ProfileComponent, {
      width: '600px',
    })
  }
  onLogout(){
    this.isLogging=false;
    this.businessData.isLogging=false;
  }
}
