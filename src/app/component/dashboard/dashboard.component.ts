import { Component, OnInit } from '@angular/core';
// import { FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BusinessDataService } from 'src/app/services/business-data.service';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  // expenseForm!:FormGroup;
  isLogging: boolean = true;
  keywords = ['Transportation', 'Groceries', 'Entertainment', 'Miscellaneous'];
  newKeywords = ['Netflix'];
  constructor(
    private businesData: BusinessDataService,
    private route: Router,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.businesData.keywords.push(...this.keywords);
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

  onSave() {
    // this.keywords.push(...this.newKeywords); //api to save all response
    // this.businesData.keywords=[];
    this.businesData.keywords.push(...this.newKeywords);
    // this.newKeywords=[];
  }

  onReset() {
    this.newKeywords = [];
  }
  openDialog(): void {
    this.dialog.open(ProfileComponent, {
      width: '500px',
    });
  }
  onView() {
    this.route.navigate(['dashboard']);
  }
}
