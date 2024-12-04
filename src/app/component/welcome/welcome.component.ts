import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { BusinessDataService } from 'src/app/services/business-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit{
  isLogging:boolean=true;
  appVersion:any='';
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
        this.businessData.appVersion=res.version;
        this.appVersion=res.version;
        sessionStorage.setItem('Version',this.appVersion);
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


}
