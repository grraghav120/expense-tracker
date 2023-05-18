import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { ChartConfiguration } from 'chart.js';

import { MatDialog } from '@angular/material/dialog';
import { BusinessDataService } from 'src/app/services/business-data.service';
@Component({
  selector: 'app-show-chart',
  templateUrl: './show-chart.component.html',
  styleUrls: ['./show-chart.component.scss'],
})
export class ShowChartComponent implements OnInit {

  constructor(public dialog: MatDialog,public businessData:BusinessDataService) {}
  chartType:any=[];
  public pieChartLabels :any= [];
  pieValues:any=[];
  pieChartDatasets:any;
  years:any=['2022','2023'];
  selectedYear='2023';
  ngOnInit(): void {
    this.selectedYear='2023';
    this.chartType=this.businessData.chartType;
    this.pieChartLabels=this.businessData.pieLabels;
    this.pieChartDatasets = [
      {
        data: this.businessData.piedata,
      },
    ];
    console.log(this.pieChartDatasets);
    console.log(this.pieChartLabels);
  }

  public pieChartLegend = true;
  public pieChartPlugins = [];

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['2006', '2007', '2008', '2009', '2010', '2011','2006', '2007', '2008', '2009', '2010','2011'],
    datasets: [
      { 
        data: [33,65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81],
        label: 'Month Apr'
      }
      ],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };

}
