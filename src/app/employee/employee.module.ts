import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmploylistComponent } from './employlist.component';
import { RouterModule } from '@angular/router';
import { EmployeedetailsComponent } from './employeedetails.component';
import { EmployeeeditComponent } from '../employeeedit/employeeedit/employeeedit.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [EmploylistComponent,EmployeedetailsComponent,EmployeeeditComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {path:'list',component:EmploylistComponent},
      {path:'list/:id',component:EmployeedetailsComponent},
      {path:'list/:id/edit',component:EmployeeeditComponent}
    ])
  ]
})
export class EmployeeModule { }
