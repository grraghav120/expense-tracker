import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { ChartConfiguration } from 'chart.js';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExpenseContent } from './show-charts.modal';
import { MatDialog } from '@angular/material/dialog';
import { AddExpenseComponent } from '../add-expense/add-expense.component';
@Component({
  selector: 'app-show-chart',
  templateUrl: './show-chart.component.html',
  styleUrls: ['./show-chart.component.scss'],
})
export class ShowChartComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'name',
    'amount',
    'expense_date',
    'expense_category',
    'payment',
    'comments',
  ];

  ELEMENT_DATA: ExpenseContent[] = [
    {
      name: 'raghav',
      amount: 300,
      expense_date: '20 Apr 2023',
      expense_category: 'Groceries',
      payment: 'card',
      comments: 'ho gya',
    },
  ];

  dataSource = new MatTableDataSource<ExpenseContent>(this.ELEMENT_DATA);

  @Input() chartType: any;
  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {}
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = ['Download', 'In', 'Mail Sales'];
  public pieChartDatasets = [
    {
      data: [300, 500, 100],
    },
  ];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
    datasets: [{ data: [65, 59, 80, 81, 56, 55, 40], label: 'Month Apr' }],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };
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
