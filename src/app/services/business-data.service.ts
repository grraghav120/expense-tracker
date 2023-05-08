import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BusinessDataService {
  
  isLogging: boolean = false;
  // keywords=new Set();
  expensesLogged = '';
  keywords:any=['Transportation','Groceries','Entertainment','Miscellaneous']
  data:any;
  apiUrl = 'http://localhost:3000/v1/api/';
  constructor(private route: Router, public http: HttpClient) {
  }

  onSignUp(values: any) {
    console.log(values);
    let content = JSON.stringify(values);
    localStorage.setItem('user', content);
  }
  onView() {
    this.route.navigate(['welcome']);
  }
  onLogout() {
    this.route.navigate(['welcome']);
  }

  onGetAllExpense() {
    return this.http.get(this.apiUrl + 'GET_ALL_EXPENSE');
  }

  onCreateExpense(values: any,date:any) {
    let body={
      name: values.name,
      amount: values.amount,
      expense_date: (date[0]+' '+date[1]+' '+date[2]+' '+date[3]),
      expense_category: values.expense_category,
      payment: values.payment,
      comment: values.comment
    }
    return this.http.post(this.apiUrl + 'CREATE_EXPENSE', body);
  }

  onCreateCategory(body:any){
    this.keywords.push(...body);
    let data={categories:this.keywords};
    return this.http.post(this.apiUrl+'CREATE_CATEGORY',data);
  }
  
  onDeleteExpense(id:string){
    return this.http.delete(this.apiUrl+'DELETE_EXPENSE/'+id);
  }

  onGetSingleExpense(id:string){
    return this.http.get(this.apiUrl+'GET_SINGLE_EXPENSE/'+id);
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
      comment: values.comment
    }
    return this.http.patch(this.apiUrl+'UPDATE_EXPENSE/'+id,body);
  }
}
