import { Component, OnInit, ViewChild } from '@angular/core';
import { BusinessDataService } from 'src/app/services/business-data.service';
import { MatPaginator } from '@angular/material/paginator';
import { ExpenseContent } from './view-expense.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth/auth.service';
import { ViewSingleComponent } from '../view-single/view-single.component';
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
  userId:any;
  isLoading:boolean=true;
  isDelete:boolean=false;
  dataSource = new MatTableDataSource<ExpenseContent>();
  constructor(
    public businessData: BusinessDataService,
    public dialog: MatDialog,
    public http: HttpClient,
    public route:Router,
    public authServ:AuthService,
    public _snackBar:MatSnackBar,
  ) {this.userId=localStorage.getItem('Id')?.split(' ')[1];}
  
  cards: any = [];
  allexpense:any=0;
  count:any=0;
  ngOnInit(): void {
    this.isLoading=true;
    this.isDelete=false;
    this.userId=localStorage.getItem('Id')?.split(' ')[1];
    this.getAllExpense(this.userId);
  }
  onHome(){
    this.route.navigate(['home']);
  }
  public updateExpene(){
    let body={
      expenseLogged:(this.businessData.expensesLogged)?this.businessData.expensesLogged:0,
    }
    this.authServ.updateUserData(this.userId,body);
  }

  public getAllExpense(id:any) {
    this.businessData.onGetAllExpense(id).subscribe((res: any) => {
      this.ELEMENT_DATA = res.data;
      this.dataSource = new MatTableDataSource<ExpenseContent>(
        this.ELEMENT_DATA
      );
      this.count=0;
      let len=res.data.length;
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      },5000);
      this.cards = [
        {
          icon: 'today',
          title: 'First Expense Date',
          content: (len>0)?(res.data[0].expense_date):'-',
        },
        {
          icon: 'today',
          title: 'Latest Expense Date',
          content: (len>0)?(res.data[res.data.length - 1].expense_date):'-',
        },
        {
          icon: 'numbers',
          title: 'Number of Expenses',
          content: len,
        },
        { icon: 'monetization_on', title: 'Total Amount', content: '₹'+this.count },
      ];
      this.allexpense=len;
      this.businessData.expensesLogged=this.allexpense;
      this.updateExpene();
      this.pieChartData(res.data);
      this.onBarChartEdit(res.data);
      setTimeout(() => {
        this.isLoading=false;
      }, 4000);
    },(error)=>{
      this._snackBar.open('Session Expired!!','',{duration:2000});
      this.authServ.onLogout();
    });
  }

  //logic of pie chart
  
  cate:any;
  hashMap:any={};
  public pieChartData(data:any){
    this.businessData.pieLabels=[];
    this.businessData.piedata=[];
    this.hashMap={};
    this.count=0;
    if(data){
    this.businessData.onGetAllCategory().subscribe((res:any)=>{
      this.cate=res.data;
      
      for(let i=0;i<this.cate.length;i++){
        this.hashMap[this.cate[i]]=0;
      }
      for(let i =0;i<data.length;i++){
        this.hashMap[data[i].expense_category]+=data[i].amount;
      }

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
  }

  openPieChart()
  {
    this.businessData.chartType='pie';
    let pieDialogRef = this.dialog.open(ShowChartComponent, {
      width: '500px',
      height: '400px',
    });
    this.businessData.pieDialogRef=pieDialogRef;
  }

  // pie chart logic ends

  //bar charts logic

  onBarChartEdit(data:any){
    let hashmap:any={};
    for(let i=0;i<data.length;i++){
      let date=data[i].expense_date.toString().split(' ');
      hashmap[date[3]]=[];
    }
    for(let i=0;i<data.length;i++){
      let date=data[i].expense_date.toString().split(' ');
      hashmap[date[3]].push([date[1],data[i].amount]);
    }
    this.businessData.hashmap=hashmap;
    // console.log(hashmap);
  }

  openBarChart(){
    this.businessData.chartType='bar';
    let dialogRef = this.dialog.open(ShowChartComponent, {
      width: '700px',
      height: '450px',
    });
  }

  //logic ends

  onOpen(element: any) {
    this.openDialog();
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
      if(result==="delete") {
        // this.isDelete=true;
        this.getAllExpense(this.userId);
      }
    });
  }
}

@Component({
  selector: 'confirm',
  templateUrl: 'confirm.html',
})
export class Confirm{
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

  onView(){
    let tableData;
    this.businessData.onGetSingleExpense(this.businessData.data.data._id).subscribe((res: any) => {
      tableData=res.data;
      let dialogRef = this.dialog.open(ViewSingleComponent, {
        width: '300px',
        height: '250px',
        data:{
          data:tableData,
        }
      });
    });
  }
}
