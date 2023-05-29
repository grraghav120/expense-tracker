import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertBoxComponent } from '../alert-box/alert-box.component';
import { HashLocationStrategy } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BusinessDataService } from 'src/app/services/business-data.service';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss'],
})
export class ImportComponent implements OnInit {
  isCorrect: boolean = false;
  displayedColumns: string[] = [
    'name',
    'amount',
    'date',
    'category',
    'payment',
    'comment',
  ];
  dataSource: any = [
    {
      name: '',
      amount: '',
      date: '',
      category: '',
      payment: '',
      comment: '',
    },
  ];
  propertyNames: string[] = [];
  dataRows: string[] = [];
  constructor(public route: Router, public dialog: MatDialog,public snackBar:MatSnackBar,public businessData:BusinessDataService) {}
  ngOnInit(): void {}

  onView() {
    this.route.navigate(['dashboard']);
  }

  onSaveImport() {
    if(this.dataRows.length!==this.propertyNames.length){
      this.snackBar.open('Bad Format','',{duration:2000});
      return;
    }
    let hashamp:any={};

    let name:boolean=false;
    let amount:boolean=false;
    let expense_date:boolean=false;
    let expense_category:boolean=false;
    let payment_type:boolean=false;
    let comment :boolean=false;

    for(let i=0;i<this.propertyNames.length;i++){
      this.propertyNames[i].toLowerCase();
      if(this.propertyNames[i]==='name' || this.propertyNames[i]==='expense_name' || this.propertyNames[i]==='expense name'){
        hashamp['expense_name']=this.dataRows[i];
        name=true;
      }
      else if(this.propertyNames[i]==='amount' || this.propertyNames[i]==='amounts'){
        hashamp['amount']=parseInt(this.dataRows[i]);
        amount=true;
      }
      else if(this.propertyNames[i]==='expense date' || this.propertyNames[i]==='date' || this.propertyNames[i]==='expense_date'){
        hashamp['expense_date']=this.dataRows[i];
        expense_date=true;
      }
      else if(this.propertyNames[i]==='payment' || this.propertyNames[i]==='payment_type' || this.propertyNames[i]==='payment type'){
        hashamp['payment_type']=this.dataRows[i];
        payment_type=true;
      }
      else if(this.propertyNames[i]==='expense_category' || this.propertyNames[i]==='expense category' || this.propertyNames[i]==='category'){
        hashamp['expense_category']=this.dataRows[i];
        expense_category=true;
      }
      else if(this.propertyNames[i]==='comments' || this.propertyNames[i]==='comment'){
        hashamp['comment']=this.dataRows[i];
        comment=true;
      }
    }
    // console.log(hashamp);
    if(!name || !amount || !expense_date){
      this.snackBar.open('Please Mention required Fields Properly','',{duration:2000});
      return;
    }
    if(hashamp['expense_date'].split('/')[2].length!=4){
      this.snackBar.open('Date Format DD/MM/YYYY','',{duration:2000});
      return;
    }
    if(parseInt(hashamp['expense_date'].split('/')[1])>12){
      this.snackBar.open('Date Format DD/MM/YYYY','',{duration:2000});
      return;
    }
    if(!expense_category){
      hashamp['expense_category']='Unassigned';
    }
    if(!payment_type){
      hashamp['payment_type']='Card';
    }
    if(!comment){
      hashamp['comment']='Unassigned';
    }
    
    //apii cal;

    this.onSaveExpense(hashamp);
  }

  onSaveExpense(body:any) {
    this.businessData
      .onImportExpense(body)
      .subscribe((res: any) => {
        if (res.status === true) {
          this.snackBar.open('Expense Added',' ',{duration:2000});
        }
      },error=>{
        this.snackBar.open(error.message,' ',{duration:2000});
      });
  }

  importDataFromCSV(event: any) {
    if (event.target.files[0].type !== 'text/csv') {
      this.dialog.open(AlertBoxComponent, {
        data: { type: 'error' },
      });
    } else {
      this.isCorrect = true;
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          let fileContents = e.target.result.toString();
          let data = fileContents.split('\r');
          this.propertyNames = data[0].split(',');
          this.dataRows = data[1].split('\n')[1].split(',');
          // console.log(this.propertyNames,this.dataRows);
        };
        reader.readAsText(file);
      }
      
      
    }
  }
}
