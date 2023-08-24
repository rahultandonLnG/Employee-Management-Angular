import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './Components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './Components/employee-form/employee-form.component';
import { NgxIndexedDBModule } from 'ngx-indexed-db';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeUpdateModalComponent } from './Components/employee-update-modal/employee-update-modal.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from './Components/confirmation-modal/confirmation-modal.component';
import { EmployeeNavbarComponent } from './Components/employee-navbar/employee-navbar.component';
import { EmployeeFooterComponent } from './Components/employee-footer/employee-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeFormComponent,
    EmployeeUpdateModalComponent,
    ConfirmationModalComponent,
    EmployeeNavbarComponent,
    EmployeeFooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxIndexedDBModule.forRoot({
      name: 'employeeDB',
      version: 1,
      objectStoresMeta: [
        {
          store: 'employees',
          storeConfig: { keyPath: 'id', autoIncrement: true },
          storeSchema: [
            { name: 'firstName', keypath: 'firstName', options: { unique: false } },
            { name: 'lastName', keypath: 'lastName', options: { unique: false } },
            { name: 'email', keypath: 'email', options: { unique: true } }
            // Add other fields as needed
          ]
        }
      ]
    }),
    BrowserAnimationsModule,
  ],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
