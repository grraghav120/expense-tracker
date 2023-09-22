import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(){}
    intercept(req: HttpRequest<any>, next: HttpHandler){
        let token=localStorage.getItem('LEAD_ID');
        const authToken=token;
        const authReq=req.clone({
            headers:req.headers.set('authentication',"BreakerHeaders "+ authToken),
        }); 
        return next.handle(authReq);
    }
}