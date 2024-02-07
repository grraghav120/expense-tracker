import { Component, OnInit,Inject } from '@angular/core';
import { BusinessDataService } from 'src/app/services/business-data.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';


@Component({
  selector: 'app-view-single',
  templateUrl: './view-single.component.html',
  styleUrls: ['./view-single.component.scss']
})
export class ViewSingleComponent implements OnInit{
  tableData:any=[];
  isLoading:boolean=false;
  constructor(public businessData:BusinessDataService){
    
  }
  ngOnInit(): void {
    // console.log(this.tableData);
    this.onGetSingleExpense();
  }
  
  onGetSingleExpense(){
    this.isLoading=true;
    this.businessData.onGetSingleExpense(this.businessData.data.data._id).subscribe((res: any) => {
      this.tableData=res.data;
      this.isLoading=false;
    });
  }

}
