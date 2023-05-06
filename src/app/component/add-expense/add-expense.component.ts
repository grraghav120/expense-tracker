import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BusinessDataService } from 'src/app/services/business-data.service';
@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
})
export class AddExpenseComponent implements OnInit {
  appearance: MatFormFieldAppearance = 'legacy' as MatFormFieldAppearance;
  expenseForm!: FormGroup;
  keywords: any = [];
  payments: any = ['Card', 'Cash', 'UPI', 'Net Banking', 'Paypal'];
  actions: any = '';
  constructor(public businessData: BusinessDataService,private _snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.keywords = this.businessData.keywords;
    this.expenseForm = new FormGroup({
      name: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      payment: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      comments: new FormControl(''),
    });
  }
  onReset() {
    this.expenseForm.reset();
  }
  onSaveExpense() {
    this.businessData.onCreateExpense(this.expenseForm.value).subscribe((res:any)=>{
      if(res.status===true){
        this._snackBar.open('Expense Added','',{duration:2000});
        this.onReset();
      }
    })
  }
  onEdit() {}
  onDelete() {}
}
