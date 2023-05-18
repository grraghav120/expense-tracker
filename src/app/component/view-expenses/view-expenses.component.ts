import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { BusinessDataService } from 'src/app/services/business-data.service';
import { MatPaginator } from '@angular/material/paginator';
import { ExpenseContent } from './view-expense.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth/auth.service';
import { ChartOptions } from 'chart.js';
import { ChartConfiguration } from 'chart.js';
import { ShowChartComponent } from '../show-chart/show-chart.component';
@Component({
  selector: 'app-view-expenses',
  templateUrl: './view-expenses.component.html',
  styleUrls: ['./view-expenses.component.scss'],
})
export class ViewExpensesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'name',
    'amount',
    'expense_date',
    'expense_category',
    'payment',
    'comment',
  ];

  ELEMENT_DATA: ExpenseContent[] = [];
  dataSource = new MatTableDataSource<ExpenseContent>();
  constructor(
    public businessData: BusinessDataService,
    public dialog: MatDialog,
    public http: HttpClient,
    public route:Router,
    public authServ:AuthService,
    public _snackBar:MatSnackBar,
  ) {}
  
  cards: any = [];
  userId:any;
  allexpense='';
  count:any=0;
  ngOnInit(): void {
    this.userId=localStorage.getItem('Id')?.split(' ')[1];
    this.getAllExpense(this.userId);
  }
  onHome(){
    this.route.navigate(['home']);
  }
  public updateExpene(){
    let body={
      expenseLogged:this.businessData.expensesLogged,
    }
    this.authServ.updateUserData(this.userId,body);
  }
  public getAllExpense(id:any) {
    this.businessData.onGetAllExpense(id).subscribe((res: any) => {
      this.ELEMENT_DATA = res.data;
      this.dataSource = new MatTableDataSource<ExpenseContent>(
        this.ELEMENT_DATA
      );
      this.dataSource.paginator = this.paginator;
      this.cards = [
        {
          icon: 'today',
          title: 'First Expense Date',
          content: res.data[0].expense_date,
        },
        {
          icon: 'today',
          title: 'Latest Expense Date',
          content: res.data[res.data.length - 1].expense_date,
        },
        {
          icon: 'numbers',
          title: 'Number of Expenses',
          content: res.data.length,
        },
        { icon: 'monetization_on', title: 'Total Amount', content: '₹'+this.count },
      ];
      this.allexpense=res.data.length;
      this.businessData.expensesLogged=this.allexpense;
      this.updateExpene();
      this.pieChartData(res.data);
    },(error)=>{
      this._snackBar.open('Session Expired!!','',{duration:2000});
      this.authServ.onLogout();
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  //logic of pie chart
  
  cate:any;
  hashMap:any={};
  public pieChartData(data:any){
    this.businessData.onGetAllCategory().subscribe((res:any)=>{
      this.cate=res.data;
      
      for(let i=0;i<this.cate.length;i++){
        this.hashMap[this.cate[i]]=0;
      }
      for(let i =0;i<data.length;i++){
        this.hashMap[data[i].expense_category]+=data[i].amount;
      }
      // console.log(this.hashMap);
      this.businessData.pieLabels=[];
      this.businessData.piedata=[];
      this.count=0;
      for(let key in this.hashMap){
        if(this.hashMap[key]!=0){
          this.businessData.pieLabels.push(key);
          this.businessData.piedata.push(this.hashMap[key]);
          this.count+=this.hashMap[key];
        }
      }
      this.cards[3].content='₹'+this.count;
      
    })
  }

  openBarChart(){
    this.businessData.chartType='bar';
    let dialogRef = this.dialog.open(ShowChartComponent, {
      width: '700px',
      height: '400px',
    });
  }

  openPieChart()
  {
    this.businessData.chartType='pie';
    let dialogRef = this.dialog.open(ShowChartComponent, {
      width: '500px',
      height: '400px',
    });
  }

  // pie chart logic ends

  onOpen(element: any) {
    this.openDialog();
    // console.log(element);
    let body = {
      action: 'edit',
      data: element,
    };
    this.businessData.data = body;
  }
  openDialog(): void {
    let dialogRef = this.dialog.open(Confirm, {
      width: '300px',
      height: '190px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllExpense(this.userId);
      this.updateExpene();
    });
  }
}
@Component({
  selector: 'confirm',
  templateUrl: 'confirm.html',
})
export class Confirm {
  constructor(
    public dialogRef: MatDialogRef<Confirm>,
    public dialog: MatDialog,
    public businessData: BusinessDataService,
    public route: Router,
    public _snackBar:MatSnackBar
  ) {}

  onOpen() {
    this.route.navigate(['edit', this.businessData.data.data._id]);
  }
  onDelete() {
    this.businessData
      .onDeleteExpense(this.businessData.data.data._id)
      .subscribe((res: any) => {
        this._snackBar.open(res.message,'',{duration:2000});
      });
  }
}
