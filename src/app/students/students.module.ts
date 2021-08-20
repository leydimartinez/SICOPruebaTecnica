import { NgModule,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './components/students/students.component';
import { MatTableModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule, MatPaginatorModule,MatDialogModule ,MatTabsModule,MatSelectModule,MatListModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ManageStudentsComponent } from './components/modal/manage-students/manage-students.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    StudentsComponent,
    ManageStudentsComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatPaginatorModule, 
    NgbModule,
    MatDialogModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatTabsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatSelectModule,
    MatListModule
  ],
  entryComponents: [ManageStudentsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StudentsModule { }
