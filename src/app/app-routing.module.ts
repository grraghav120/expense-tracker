import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AddExpenseComponent } from './component/header/add-expense/add-expense.component';

const routes: Routes = [
  {
    path:'home',
    loadChildren:()=>import('./component/header/header.module').then((m)=>m.HeaderModule),
  },

  {
    path:'welcome',
    loadChildren:()=>import('./component/welcome/welcome.module').then((m)=>m.WelcomeModule),
  },

  {
    path:'edit/:id',
    component:AddExpenseComponent,
    canActivate:[AuthGuard],
    title:'Edit Expense | ExpenseTracker'
  },
  
  {
    path:'dashboard',
    loadChildren:()=>import("./component/home/home.module").then((m)=>m.HomeModule),
  },
  
  {path:'**', redirectTo:'welcome'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
