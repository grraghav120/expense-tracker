import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import {
  Confirm,
  ViewExpensesComponent,
} from './view-expenses/view-expenses.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewSingleComponent } from './view-single/view-single.component';
import { ShowChartComponent } from './show-chart/show-chart.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    title:'Dashboard | ExpenseTracker'
  },
];

@NgModule({
  declarations: [
    HomeComponent,
    ViewExpensesComponent,
    Confirm,
    ViewSingleComponent,
    ShowChartComponent,
  ],

  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class HomeModule {}
