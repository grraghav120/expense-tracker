import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserData } from '../component/signup/signup.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'http://localhost:3000/v1/api/';
  constructor(public http:HttpClient) { }

  onSignUp(values:any){
    let body={
      name:values.name,
      username:values.username,
      gmail:values.gmail,
      password:values.password,
      userFirstSignUp:new Date(),
    }    
    return this.http.post(this.apiUrl+'USER/SIGN_UP',body);
  }

  onLogin(body:any){
    // console.log(body);
    return this.http.post(this.apiUrl+'USER/LOGIN',body);
  }

}
