import { Component, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BusinessDataService } from 'src/app/services/business-data.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {
  @Output() skipFeedback = new EventEmitter<string>();
  rating: number | null = null;
  ratingOptions: number[] = Array.from({ length: 5 }, (_, i) => i+1); 
  reason: number | null = 0;

  constructor(
    public businessService:BusinessDataService,
    public snackBar:MatSnackBar
  )
  {}

  selectRating(option: number) {
    this.rating = option;
  }
  onSkipFeedback(isSkip:any){
    if(isSkip=='noSkip'){
      let body={
        email:localStorage.getItem('user_email'),
        rating:this.rating,
        reason:this.reason,
        createdAt:new Date(),
      };
      //post feedback to DB
      console.log(body);
      this.businessService.onProvideFeedback(body).subscribe((res:any)=>{
        if(res.status){
          console.log(res);
        }else{
          this.snackBar.open('Error!! Please try again','',{duration:2000});
        }
      });
    }
    this.skipFeedback.emit(isSkip);
  }
}
