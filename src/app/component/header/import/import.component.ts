import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BusinessDataService } from 'src/app/services/business-data.service';
import { AlertBoxComponent } from 'src/app/shared/alert-box/alert-box.component';

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
  csvRecords: any;
  header: boolean = false;
  constructor(public route: Router, public dialog: MatDialog,public snackBar:MatSnackBar,public businessData:BusinessDataService) {}
  ngOnInit(): void {}

  onView() {
    this.route.navigate(['dashboard']);
  }

  onSaveImport() {
    this.propertyNames=this.csvRecords[0];
    console.log(this.csvRecords);
    
    let hashamp:any={};
    let name:boolean=false;
    let amount:boolean=false;
    let expense_date:boolean=false;
    let expense_category:boolean=false;
    let payment_type:boolean=false;
    let comment :boolean=false;

    for(let j=1;j<this.csvRecords.length-1;j++)
    {
      hashamp={};
      name=false;
      amount=false;
      expense_category=false;
      expense_date=false;
      payment_type=false;
      comment=false;
      for(let i=0;i<this.propertyNames.length;i++)
      {
        this.propertyNames[i].toLowerCase();
        if(this.propertyNames[i]==='name' || this.propertyNames[i]==='expense_name' || this.propertyNames[i]==='expense name'){
          if(this.csvRecords[j][i] &&(this.csvRecords[j][i]!='' || this.csvRecords[j][i]!=' ')){
          hashamp['expense_name']=this.csvRecords[j][i];
          name=true;
          }
        }
        else if(this.propertyNames[i]==='amount' || this.propertyNames[i]==='amounts'){
          if(this.csvRecords[j][i] &&(this.csvRecords[j][i]!='' || this.csvRecords[j][i]!=' ')){
            hashamp['amount']=parseInt(this.csvRecords[j][i]);
            amount=true;
          }
        }
        else if(this.propertyNames[i]==='expense date' || this.propertyNames[i]==='date' || this.propertyNames[i]==='expense_date'){
          if(this.csvRecords[j][i] &&(this.csvRecords[j][i]!='' || this.csvRecords[j][i]!=' ')){
          hashamp['expense_date']=this.csvRecords[j][i];
          expense_date=true;
          }
        }
        else if(this.propertyNames[i]==='payment' || this.propertyNames[i]==='payment_type' || this.propertyNames[i]==='payment type'){
          if(this.csvRecords[j][i] &&(this.csvRecords[j][i]!='' || this.csvRecords[j][i]!=' ')){
          hashamp['payment_type']=this.csvRecords[j][i];
          payment_type=true;
          }
        }
        else if(this.propertyNames[i]==='expense_category' || this.propertyNames[i]==='expense category' || this.propertyNames[i]==='category'){
          if(this.csvRecords[j][i] &&(this.csvRecords[j][i]!='' || this.csvRecords[j][i]!=' ')){
          hashamp['expense_category']=this.csvRecords[j][i];
          expense_category=true;
          }
        }
        else if(this.propertyNames[i]==='comments' || this.propertyNames[i]==='comment'){
          if(this.csvRecords[j][i] &&(this.csvRecords[j][i]!='' || this.csvRecords[j][i]!=' ')){
          hashamp['comment']=this.csvRecords[j][i];
          comment=true;
          }
        }
      }
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
          hashamp['comment']='Unassigned Expense';
        }
        this.onSaveExpense(hashamp);
      // }
    }
  }

  onSaveExpense(body:any) {
    this.businessData
      .onImportExpense(body)
      .subscribe((res: any) => {
        if (res.status === true) {
          console.log("Added");
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
      return;
    }
    let files = event.target.files; // FileList object
    let file = files[0];
    var reader = new FileReader();
      reader.readAsText(file);
      reader.onload = (event:any)=>{
        let csv = event.target.result; // Content of CSV file
        csv=csv.toString();
        let allTextLines = csv.split(/\r\n|\n/);
        let headers = allTextLines[0].split(',');
        for(let i=0;i<allTextLines.length-1;i++){
          allTextLines[i]=allTextLines[i].split(',')
        }
        this.csvRecords=allTextLines;
        // console.log(allTextLines,headers);
      }

    // this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',', encoding: 'utf8' })
    //   .pipe().subscribe({
    //     next: (result): void => {
    //       this.csvRecords = result;
    //       console.log(this.csvRecords);
          
    //     },
    //     error: (error: NgxCSVParserError): void => {
    //       console.log('Error', error);
    //     }
    //   });
  }


}
