import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { HeaderComponent } from './header.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ImportComponent } from './import/import.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: HeaderComponent,
    canActivate: [AuthGuard],
    title:'Home | ExpenseTracker'
  },
];

@NgModule({
  declarations: [
    HeaderComponent,
    DashboardComponent,
    ImportComponent,
    AddCategoryComponent,
    AddExpenseComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
})
export class HeaderModule {}
