import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BusinessDataService {
  
  isLogging: boolean = false;
  isChecking:boolean=false;
  hashmap:any={};
  public pieDialogRef:any;
  pieLabels:any=[];
  piedata:any=[];
  chartType:any;
  expensesLogged :any=0;
  latestLoginDate:any='';
  firstLoginDate:any=''
  keywords:any;
  data:any;
  apiUrl = environment.apiUrl;
  userId:any;
  constructor(private route: Router, public http: HttpClient) {
  }

  onHome(){
    this.route.navigate(['home']);
  }
  onNavigate(url:any){
    this.route.navigate([url]);
  }

  onGetAllExpense(id:any) {
    this.userId=id;
    return this.http.get(this.apiUrl + 'GET_ALL_EXPENSE/'+id);
  }

  onCreateExpense(values: any,date:any) {
    let id=localStorage.getItem('Id')?.split(' ')[1];
    let body={
      name: values.name,
      amount: values.amount,
      expense_date: (date[0]+' '+date[1]+' '+date[2]+' '+date[3]),
      expense_category: values.expense_category,
      payment: values.payment,
      comment: values.comment,
      creater:id,
    }
    return this.http.post(this.apiUrl + 'CREATE_EXPENSE', body);
  }


  onImportExpense(values:any){
    let id=localStorage.getItem('Id')?.split(' ')[1];
    let date=values.expense_date.split('/');
    date=(new Date(date[2],date[1]-1,date[0])).toString();
    date=date.split(' ');
    let body={
      name: values.expense_name,
      amount: values.amount,
      expense_date: (date[0]+' '+date[1]+' '+date[2]+' '+date[3]),
      expense_category: values.expense_category,
      payment: values.payment_type,
      comment: values.comment,
      creater:id,
    }
    return this.http.post(this.apiUrl+'CREATE_EXPENSE',body);
  }


  onCreateCategory(body:any){
    return this.http.post(this.apiUrl+'SAVE_CATEGORY/'+this.userId,body);
  }
  
  onDeleteExpense(id:string){
    return this.http.delete(this.apiUrl+'DELETE_EXPENSE/'+this.userId+'/'+id);
  }

  onGetSingleExpense(id:string){
    return this.http.get(this.apiUrl+'GET_SINGLE_EXPENSE/'+this.userId+'/'+id);
  }

  onUpdateExpense(id:string,values:any){
    let str=values.expense_date.toString();
    let date=str.split(' ');
    let body={
      name: values.name,
      amount: values.amount,
      expense_date: (date[0]+' '+date[1]+' '+date[2]+' '+date[3]),
      expense_category: values.expense_category,
      payment: values.payment,
      comment: values.comment,
      creater:this.userId,
    }
    return this.http.patch(this.apiUrl+'UPDATE_EXPENSE/'+this.userId+'/'+id,body);
  }

  onGetAllCategory(){
    this.userId=localStorage.getItem('Id')?.split(' ')[1];
    return this.http.get(this.apiUrl+'GET_CATEGORY/'+this.userId);
  }
  onGithub(){
    const link=document.createElement('a');
    link.href="https://github.com/grraghav120";
    link.click();
  }
  onLinkedin(){
    const link=document.createElement('a');
    link.href="https://www.linkedin.com/in/raghavgarg2002/";
    link.click();
  }
}
