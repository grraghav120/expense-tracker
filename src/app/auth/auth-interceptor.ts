import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService:AuthService){}
    intercept(req: HttpRequest<any>, next: HttpHandler){
        let token=localStorage.getItem('LEAD_ID');
        let id=localStorage.getItem('Id');
        const authToken=token;
        const authReq=req.clone({
            headers:req.headers.set('authentication',"BreakerHeaders "+ authToken),
        }); 
        return next.handle(authReq);
    }
}