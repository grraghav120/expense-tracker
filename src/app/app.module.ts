import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { SignupComponent } from './component/signup/signup.component';
import { LoginComponent } from './component/login/login.component';
import { AddExpenseComponent } from './component/add-expense/add-expense.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTooltipModule} from '@angular/material/tooltip';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { ProfileComponent } from './component/profile/profile.component';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import { FooterComponent } from './component/footer/footer.component';
import { HeaderComponent } from './component/header/header.component';
import { AddCategoryComponent } from './component/add-category/add-category.component';
import { ViewExpensesComponent } from './component/view-expenses/view-expenses.component';
import { MatTabsModule } from '@angular/material/tabs';
import { NgChartsModule } from 'ng2-charts';
import { ShowChartComponent } from './component/show-chart/show-chart.component';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TableviewComponent } from './component/tableview/tableview.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { Confirm } from './component/view-expenses/view-expenses.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import {MatStepperModule} from '@angular/material/stepper';
import { ImportComponent } from './component/import/import.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    Confirm,
    AddExpenseComponent,
    DashboardComponent,
    ProfileComponent,
    FooterComponent,
    HeaderComponent,
    AddCategoryComponent,
    ViewExpensesComponent,
    ShowChartComponent,
    WelcomeComponent,
    TableviewComponent,
    ImportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatDialogModule,
    HttpClientModule,
    MatPaginatorModule,
    FormsModule,
    MatSnackBarModule,
    NgChartsModule,
    MatNativeDateModule,
    MatSelectModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatCardModule,
    MatTabsModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatStepperModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
