import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ExpenseContent } from './tableview.model';
import { MatTableDataSource } from '@angular/material/table';
import { BusinessDataService } from 'src/app/services/business-data.service';
import { AddExpenseComponent } from '../add-expense/add-expense.component';
import { MatDialog } from '@angular/material/dialog';
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
    'comments',
  ];

  ELEMENT_DATA: ExpenseContent[] = [];
  dataSource = new MatTableDataSource<ExpenseContent>();
  constructor(public businessData:BusinessDataService,public dialog:MatDialog,public http:HttpClient) {
  }
  ngOnInit(): void {
    this.businessData.onGetAllExpense().subscribe((res:any)=>{
      console.log(res);
      this.ELEMENT_DATA=res.data;
      this.dataSource = new MatTableDataSource<ExpenseContent>(this.ELEMENT_DATA);
    })
  }
  ngAfterViewInit() { 
    this.dataSource.paginator = this.paginator;
  }
  onOpen(element:any){
    this.openDialog();
    console.log(element);
    
  }
  openDialog(): void {
    this.dialog.open(AddExpenseComponent, {
      width: '600px',
    })
  }
}
