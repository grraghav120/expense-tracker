import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { ChartConfiguration } from 'chart.js';

import { MatDialog } from '@angular/material/dialog';
import { AddExpenseComponent } from '../add-expense/add-expense.component';
import { BusinessDataService } from 'src/app/services/business-data.service';
@Component({
  selector: 'app-show-chart',
  templateUrl: './show-chart.component.html',
  styleUrls: ['./show-chart.component.scss'],
})
export class ShowChartComponent implements OnInit {

  @Input() chartType: any;
  constructor(public dialog: MatDialog,public businessData:BusinessDataService) {}
  ngOnInit(): void {
    
  }

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
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
    responsive: true,
  };
}
