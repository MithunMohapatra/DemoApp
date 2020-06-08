import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { Employee } from './employee';

@Component({
  selector: 'app-employlist',
  templateUrl: './employlist.component.html',
  styleUrls: ['./employlist.component.css']
})
export class EmploylistComponent implements OnInit {
  pageTitle = "Employee List";
  employeeList: Employee[] = [];
  errorMessage:string='';
  constructor(private employeeServive: EmployeeService) { }

  ngOnInit(): void {
    this.employeeServive.getEmployeeLists()
      .subscribe({
        next: employee => {
          this.employeeList = employee
        },
        error: err => this.errorMessage = err
      })
  }

}
