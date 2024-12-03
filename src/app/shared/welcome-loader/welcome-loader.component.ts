import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-welcome-loader',
  templateUrl: './welcome-loader.component.html',
  styleUrls: ['./welcome-loader.component.scss']
})
export class WelcomeLoaderComponent {
  @Input() msg :any;
  ngOnInit(){
  }
}