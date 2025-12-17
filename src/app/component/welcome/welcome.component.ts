import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { BusinessDataService } from 'src/app/services/business-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit{
  isLogging:boolean=true;
  appVersion:any='';
  private pressTimer: any = null;
  private readonly LONG_PRESS_TIME = 1500;
  private longPressTriggered = false;

  constructor(
    public authService:AuthService,
    public _snackBar : MatSnackBar,
    public businessData:BusinessDataService,
    public activateroute:ActivatedRoute
   )
  {
    this.activateroute.queryParams.subscribe((p)=>{
      if(p['src']!=undefined && [p['src']!=null]){
        this.businessData.setComingSrc(p['src']);
      }
    });
  }
  ngOnInit(): void {
    this.isLogging=true;
    const LoggedUser=sessionStorage.getItem('LEAD_ID');
    if(LoggedUser){
      this.authService.onLogout();
      this.isLogging=true;
      this._snackBar.open('You have Logout Successfully','',{duration:3000});
    }
    if(!sessionStorage.getItem('Version')){
      this.authService.onGetAppVersion().subscribe((res:any)=>{
        this.businessData.setAppVersion(res.version);
        this.appVersion=this.businessData.getAppVersion();
      });
    }
    else{
      this.appVersion=sessionStorage.getItem('Version');
    }
  }
  onSignUp(){
    this.isLogging=false;
  }
  onLogin(){
    this.isLogging=true;
  }

  onGithub(){
    this.businessData.onGithub();
  }
  onLinkedin(){
    this.businessData.onLinkedin();
  }

  /* ---------- Desktop ---------- */
  onDoubleClick() {
    this.goToAdmin();
  }

  /* ---------- Mobile Touch ---------- */
  onTouchStart() {
    this.longPressTriggered = false;
    this.startTimer();
  }

  onTouchEnd() {
    this.clearTimer();
  }

  onTouchCancel() {
    this.clearTimer();
  }

  /* ---------- Timer Control ---------- */
  private startTimer() {
    this.clearTimer();
    this.pressTimer = setTimeout(() => {
      this.longPressTriggered = true;
      this.goToAdmin();
    }, this.LONG_PRESS_TIME);
  }

  private clearTimer() {
    if (this.pressTimer) {
      clearTimeout(this.pressTimer);
      this.pressTimer = null;
    }
  }
  ngOnDestroy() {
    this.clearTimer();
  }

  private goToAdmin() {
    if (this.longPressTriggered || true) {
      window.location.href = environment.WEBSITE_URL;
    }
  }
}
