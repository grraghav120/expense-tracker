import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BusinessDataService } from 'src/app/services/business-data.service';
import { MatChipInputEvent } from '@angular/material/chips';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit{
  @Output() categoryAdded = new EventEmitter<string>();
  keywords:any=[];
  newKeywords:any= [];
  CategoryLoad:boolean=true;
  isSaving:boolean=false;
  constructor(public businesData:BusinessDataService){}
  ngOnInit(): void {
    this.CategoryLoad=true;
    this.isSaving=false;
    this.businesData.onGetAllCategory().subscribe((res:any)=>{
      if(res){
        this.CategoryLoad=false;
        this.keywords=res.data;
      }
    });
  }

  removeKeyword(keyword: string) {
    const index = this.newKeywords.indexOf(keyword);
    if (index >= 0) {
      this.newKeywords.splice(index, 1);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.newKeywords.push(value);
    }
    event.chipInput!.clear();
  }

  onSave() { //api call
    this.isSaving=true;
    this.categoryAdded.emit(this.keywords);
    this.businesData.onCreateCategory(this.newKeywords).subscribe((res)=>{
      if(res){
        this.keywords.push(...this.newKeywords);
        this.newKeywords=[];
        this.isSaving=false;
      }
    });
  }

  onReset() {
    this.newKeywords = [];
  }

}
