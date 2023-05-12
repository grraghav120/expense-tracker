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
  latestLoginDate:any='';
  firstLoginDate:any=''
  // username:any='';
  // name:any='';
  keywords:any=['Transportation','Groceries','Entertainment','Miscellaneous']
  data:any;
  apiUrl = 'http://localhost:3000/v1/api/';
  userId:any;
  constructor(private route: Router, public http: HttpClient) {
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

  onCreateCategory(body:any){
    this.keywords.push(...body);
    let data={categories:this.keywords};
    return this.http.post(this.apiUrl+'CREATE_CATEGORY',data);
  }
  
  onDeleteExpense(id:string){
    return this.http.delete(this.apiUrl+'DELETE_EXPENSE/'+this.userId+'/'+id);
  }

  onGetSingleExpense(id:string){
    // console.log(this.userId);
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
}
