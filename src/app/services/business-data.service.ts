import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BusinessDataService {
  isLogging:boolean=false;
  keywords:any=[];
  apiUrl='http://localhost:3000/v1/api/'
  constructor(private route:Router,public http:HttpClient) { }

  onSignUp(values:any){
    console.log(values);
    let content=JSON.stringify(values);
    localStorage.setItem('user',content);
  }
  onView(){
    this.route.navigate(['welcome']);
  }
  onLogout(){
    this.route.navigate(['welcome']);
  }

  onGetAllExpense(){
    return this.http.get(this.apiUrl+'GET_ALL_EXPENSE');
  }

  onCreateExpense(body:any){
    return this.http.post(this.apiUrl+'CREATE_EXPENSE',body);
  }

}
