import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BusinessDataService {
  isLogging:boolean=false;
  keywords:any=[];
  constructor(private route:Router) { }

  onSignUp(values:any){
    console.log(values);
    let content=JSON.stringify(values);
    localStorage.setItem('user',content);
  }
  onView(){
    this.route.navigate(['welcome']);
  }
}
