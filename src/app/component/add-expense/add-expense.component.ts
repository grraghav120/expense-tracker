import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { BusinessDataService } from 'src/app/services/business-data.service';
@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
})
export class AddExpenseComponent implements OnInit {
  appearance: MatFormFieldAppearance = 'legacy' as MatFormFieldAppearance;
  expenseForm!: FormGroup;
  isEdit: boolean = false;
  date: any;
  id: any;
  maxDate :any=new Date();
  keywords: any = [];
  payments: any = ['Card', 'Cash', 'UPI', 'Net Banking', 'Paypal'];
  months: any = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  constructor(
    public businessData: BusinessDataService,
    private _snackBar: MatSnackBar,
    private activateRoute: ActivatedRoute,
    public route: Router
  ) {}
  ngOnInit(): void {
    this.keywords = this.businessData.keywords;
    this.expenseForm = new FormGroup({
      name: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      expense_category: new FormControl('', Validators.required),
      payment: new FormControl('', Validators.required),
      expense_date: new FormControl('', Validators.required),
      comment: new FormControl(''),
    });
    this.activateRoute.paramMap.subscribe((param: ParamMap) => {
      if (param.has('id')) {
        this.isEdit = true;
        this.id = param.get('id');
        this.prePopulate();
      }
      else{
        this.isEdit=false;
      }
    });
  }
  prePopulate() {
    this.businessData.onGetSingleExpense(this.id).subscribe((res: any) => {
      let date = res.data.expense_date.toString().split(' ');
      let month = this.months.indexOf(date[1]);
      let day = parseInt(date[2]);
      let year = parseInt(date[3]);
      this.expenseForm.setValue({
        name: res.data.name,
        amount: res.data.amount,
        expense_date: new Date(year, month, day),
        expense_category: res.data.expense_category,
        payment: res.data.payment,
        comment: res.data.comment,
      });
    });
  }

  onReset() {
    this.expenseForm.reset();
  }

  addEvent(event: any) {
    let str = event.value.toString();
    this.date = str.split(' ');
  }

  onSaveExpense() {
    this.businessData
      .onCreateExpense(this.expenseForm.value, this.date)
      .subscribe((res: any) => {
        if (res.status === true) {
          this._snackBar.open('Expense Added', '', { duration: 2000 });
          this.onReset();
        } else {
          this._snackBar.open('Error occured!! Please try again', '', {
            duration: 2000,
          });
        }
      });
  }
  onEdit() {
    this.businessData
      .onUpdateExpense(this.id, this.expenseForm.value)
      .subscribe((res) => {
        if (res) {
          this._snackBar.open('Expense Updated', '', { duration: 2000 });
        } else {
          this._snackBar.open('Error! Please try Again', '', {
            duration: 2000,
          });
        }
        this.route.navigate(['dashboard']);
      });
  }
  onCancel() {
    this.route.navigate(['dashboard']);
  }
}
