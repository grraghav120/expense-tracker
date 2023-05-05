import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-view-expenses',
  templateUrl: './view-expenses.component.html',
  styleUrls: ['./view-expenses.component.scss']
})
export class ViewExpensesComponent implements OnInit{
  text1:any='raghav ';
  text2:any='rghav1';
  text3:any='raghav2';
  text4:any='raghav3';
  startDate = new Date(1990, 0, 1);
  cards=[
    {icon:'today',title:'First Expense Date',content:this.text1},
    {icon:'today',title:'Latest Expense Date',content:this.text2},
    {icon:'numbers',title:'Number of Expenses',content:this.text3},
    {icon:'monetization_on',title:'Total Amount',content:this.text4},
  ]
  constructor(){}
  ngOnInit(): void {
    
  }
}
