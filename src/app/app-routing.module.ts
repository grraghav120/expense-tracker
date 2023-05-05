import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { SignupComponent } from './component/signup/signup.component';
import { HeaderComponent } from './component/header/header.component';

const routes: Routes = [
  {path:'dashboard',component:HeaderComponent},
  {path:'signUp',component:SignupComponent},
  {path:'welcome',component:HomeComponent},
  {path:'**', redirectTo:'welcome'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
