import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ExpenseContent } from '../view-expenses/view-expense.model'
import { MatTableDataSource } from '@angular/material/table';
import { BusinessDataService } from 'src/app/services/business-data.service';
import { AddExpenseComponent } from '../add-expense/add-expense.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tableview',
  templateUrl: './tableview.component.html',
  styleUrls: ['./tableview.component.scss'],
})
export class TableviewComponent implements OnInit {
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
    public http: HttpClient
  ) {}
  ngOnInit(): void {
    this.getAllExpense();
  }
  public getAllExpense(){
    this.businessData.onGetAllExpense().subscribe((res: any) => {
      this.ELEMENT_DATA = res.data;
      this.dataSource = new MatTableDataSource<ExpenseContent>(
        this.ELEMENT_DATA
      );
      this.dataSource.paginator = this.paginator;
      this.businessData.expensesLogged = res.data.length;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  onOpen(element: any) {
    this.openDialog();
    console.log(element);
    let body = {
      action: 'edit',
      data: element,
    };
    this.businessData.data = body;
  }
  openDialog(): void {
    let dialogRef=this.dialog.open(AddExpenseComponent, {
      width: '300px',
      height: '190px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllExpense();
    });
  }
}
// @Component({
//   selector: 'confirm',
//   templateUrl: 'confirm.html',
// })
// export class Confirm {
//   constructor(public dialogRef: MatDialogRef<Confirm>,public dialog:MatDialog,public businessData:BusinessDataService) {}
//   onOpen() {
//     this.openDialog();
//   }
//   openDialog(): void {
//     this.dialog.open(AddExpenseComponent, {
//       width: '600px',
//     });
//   }
//   onDelete(){
//     this.businessData.onDeleteExpense(this.businessData.data.data._id).subscribe((res:any)=>{
//       console.log(res);
//     })
//   }
  
// }
