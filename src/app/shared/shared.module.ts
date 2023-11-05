import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatStepperModule } from '@angular/material/stepper';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FooterComponent } from './footer/footer.component';
import { ProfileComponent } from './profile/profile.component';
import { AlertBoxComponent } from './alert-box/alert-box.component';
import { NgChartsModule } from 'ng2-charts';
import { WelcomeLoaderComponent } from './welcome-loader/welcome-loader.component';

@NgModule({
  declarations: [LoaderComponent,FooterComponent,ProfileComponent,AlertBoxComponent, WelcomeLoaderComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatStepperModule,
    MatNativeDateModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCardModule,
    MatTabsModule,
    MatChipsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatDialogModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    NgChartsModule,
  ],
  exports: [
    LoaderComponent,
    FooterComponent,
    ProfileComponent,
    AlertBoxComponent,
    WelcomeLoaderComponent,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatStepperModule,
    MatNativeDateModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCardModule,
    MatTabsModule,
    MatChipsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatDialogModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    NgChartsModule,
  ],
})
export class SharedModule {}
