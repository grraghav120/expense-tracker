import { Component, OnInit } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit{
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;
  progressVal=5;
  progressEndVal=100;
  speed=90;
  constructor(){}
  ngOnInit(): void {
    let process=setInterval(() => {
      this.progressVal++;
      if(this.progressVal==this.progressEndVal){
        clearInterval(process);
      }      
    }, 70);
  }

}
