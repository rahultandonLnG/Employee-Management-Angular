import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeFormComponent } from './Components/employee-form/employee-form.component';
import { EmployeeListComponent } from './Components/employee-list/employee-list.component';

const routes: Routes = [
  { path: '', component: EmployeeListComponent },
  { path: 'add', component: EmployeeFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
