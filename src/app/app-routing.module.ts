import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { HeaderComponent } from './component/header/header.component';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { AddExpenseComponent } from './component/add-expense/add-expense.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path:'home',component:HeaderComponent,canActivate:[AuthGuard]},
  {path:'welcome',component:WelcomeComponent},
  {path:'edit/:id',component:AddExpenseComponent,canActivate:[AuthGuard]},
  {path:'dashboard',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'**', redirectTo:'welcome'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
