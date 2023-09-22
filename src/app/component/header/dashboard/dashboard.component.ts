import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProfileComponent } from 'src/app/shared/profile/profile.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  keywords: any;
  constructor(
    private route: Router,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    
  }
  handleCategory(event:any){
    this.keywords=event;
  }

  openDialog(): void {
    this.dialog.open(ProfileComponent, {
      width: '600px',
    });
  }

  onView() {
    this.route.navigate(['dashboard']);
  }
}
