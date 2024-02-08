import { Component } from '@angular/core';
import { BusinessDataService } from 'src/app/services/business-data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  app_version:any;
  constructor(public businessData:BusinessDataService){this.app_version=sessionStorage.getItem('Version');}
  onGithub(){
    this.businessData.onGithub();
  }
  onLinkedin(){
    this.businessData.onLinkedin();
  }
}
