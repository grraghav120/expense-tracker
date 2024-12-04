import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private isAuth: boolean = false;
  private token!: any;
  private expireTokenTime: any;
  private userId: any;
  private emailAddress:any;
  constructor(
    public http: HttpClient,
    public _snackBar: MatSnackBar,
    public route: Router
  ) {}

  authAfterReferesh(isAuth:boolean,token:any){
    this.isAuth=isAuth;
    this.token=token;
  }
  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuth;
  }
  getUSerId(){
    return this.userId;
  }
  
  getEmail(){
    return this.emailAddress;
  }

  setEmail(email:any){
    localStorage.setItem('user_email',email);
    this.emailAddress=email;
  }

  onSignUp(values: any):Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
    let body = {
      name: values.name,
      username: values.username,
      gmail: values.gmail,
      password: values.password,
      userFirstSignUp: new Date(),
      category:['Transportation','Groceries','Entertainment','Unassigned'],
    };
    this.http.post(this.apiUrl + 'USER/SIGN_UP', body).subscribe(
      (res: any) => {
        if (res) {
          this._snackBar.open(
            'Expense Tracker Account Created SuccessFully',
            '',
            { duration: 4000 }
          );
          this.token = res.data.token;
          this.userId=res.data.userId;
          this.setEmail(values.gmail);
          let body={
            firstLoginDate:res.data.UserSince,
            username:res.data.username,
            name:res.data.name,
            lastLoginDate:res.data.UserSince,
            userId:res.data.userId,
            expenseLogged:0,
          };
          this.saveAllData(body);
          this.expireTokenTime = setTimeout(() => {
            this.onLogout();
          }, res.data.expiredToken * 1000);
          this.isAuth = true;
          this.saveAuthDataonLocalStorage(res.data.expiredToken,res.data.userId);
          this.route.navigate(['dashboard']);
          resolve(true);
        }
      },
      (error) => {
        // console.log(error);
        this._snackBar.open('Email Already Exist! Login Please', '', {
          duration: 5000,
        });
        this.isAuth = false;
        reject(error);
      }
    );
    });
  }

  onLogin(body: any): Promise<boolean>  {
    return new Promise<boolean>((resolve, reject) => {
    this.http.post(this.apiUrl + 'USER/LOGIN', body).subscribe(
      (res: any) => {
        this._snackBar.open(res.message, '', { duration: 3000 });
        this.token = res.data.token;
        this.isAuth = true;
        this.setEmail(res.data.email);
        this.expireTokenTime = setTimeout(() => {
          this.onLogout();
        }, res.data.expiredToken * 1000);
        this.saveAuthDataonLocalStorage(res.data.expiredToken,res.data.userId);
        let updateData={
          lastLoginDate:res.data.latestLoginDate,
        }
        this.updateUserData(res.data.userId,updateData);
        this.route.navigate(['dashboard']);
        resolve(true);
      },
      (error) => {
        this._snackBar.open(error.error.message, '', { duration: 3000 });
        this.isAuth = false;
        reject(error);
      });
    });
  }

  onLogout() {
    this.token = null;
    this.isAuth = false;
    this.route.navigate(['welcome']);
    clearTimeout(this.expireTokenTime);
    sessionStorage.removeItem('LEAD_ID');
    sessionStorage.removeItem('Id');
    localStorage.removeItem('LEAD_ID');
    localStorage.removeItem('Id');
  }

  private saveAuthDataonLocalStorage(time:any,userId:any) {
    userId="954854384ubbbfhf9489r34r34fnnn "+userId+" id";
    sessionStorage.setItem('LEAD_ID', this.token);
    sessionStorage.setItem('Id',userId);
    localStorage.setItem('LEAD_ID', this.token);
    localStorage.setItem('Id',userId);
    setTimeout(() => {
      this.onLogout();
    }, time*1000);
  }

  updateUserData(id:string,body:any){
    this.http.post(this.apiUrl+'UPDATE_SAVE_DATA/'+id,body).subscribe((result)=>{
    })
  }

  saveAllData(body:any){
    this.http.post(this.apiUrl+'USER/SAVE_DATA',body).subscribe((res:any)=>{
    })
  }

  deleteUserAccount(){
    let id=sessionStorage.getItem('Id')?.split(' ')[1];
    return this.http.delete(this.apiUrl+'USER/DELETE_ACCOUNT/'+id);
  }

  onGetAppVersion(){
    return this.http.get(this.apiUrl+'USER/APP_VERSION/');
  }
  
  private onCollectSource(body:any){
    return this.http.post(this.apiUrl+'USER/USER_SOURCE/',body);
  }

  saveSource(email:string,action:string,source:string){
    let body={
      email:email,
      source:source,
      action:action,
      createdAt:new Date(),
    };
    this.onCollectSource(body).subscribe((res:any)=>{
      console.log(res.message);
    }),(error:any)=>{
      console.error(error);
    };
  }

  onProvideFeedback(body:any){
    return this.http.post(this.apiUrl+'USER/USER_FEEDBACK/',body)
  }

  onConfirmAccess(body:any){
    return this.http.post(this.apiUrl+'USER/CONFIRM_ACCESS/',body);
  }

}
