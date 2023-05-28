import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
import { AuthService } from 'src/app/auth/auth.service';
import { BusinessDataService } from 'src/app/services/business-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isLogging: any;
  constructor(
    private route: Router,
    public dialog: MatDialog,
    public authService:AuthService,
    public businessData:BusinessDataService,
  ) {}
  ngOnInit(): void {
    const token=localStorage.getItem('LEAD_ID');
    this.authService.authAfterReferesh(true,token);
  }
  onAdd() {
    this.route.navigate(['home']);
  }
  Profile() {
    this.openDialog();
  }
  openDialog(): void {
    this.dialog.open(ProfileComponent, {
      width: '600px',
    });
  }
  onLogout() {
    this.authService.onLogout();
  }
  onGithub(){
    this.businessData.onGithub();
  }
  onLinkedin(){
    this.businessData.onLinkedin();
  }
}
