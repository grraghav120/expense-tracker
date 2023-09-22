import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';
import { BusinessDataService } from 'src/app/services/business-data.service';
import { AlertBoxComponent } from 'src/app/shared/alert-box/alert-box.component';
import { ProfileComponent } from 'src/app/shared/profile/profile.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isLogging: any;
  constructor(
    public dialog: MatDialog,
    public authService:AuthService,
    public businessData:BusinessDataService,
  ) {}
  ngOnInit(): void {
    const token=localStorage.getItem('LEAD_ID');
    this.authService.authAfterReferesh(true,token);
  }
  onAdd() {
    this.businessData.onNavigate('home');
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
    this.dialog.open(AlertBoxComponent, {
      data:{type:'alert'}
    });
  }
  onGithub(){
    this.businessData.onGithub();
  }
  onLinkedin(){
    this.businessData.onLinkedin();
  }
}
