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
  constructor(public businessData:BusinessDataService,
    @Inject(MAT_DIALOG_DATA) public data: any){
    
  }
  ngOnInit(): void {
    this.tableData=this.data.data; 
    // console.log(this.tableData);
    
  }
}
