import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/employee/employee';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/employee/employee.service';

@Component({
  selector: 'app-employeeedit',
  templateUrl: './employeeedit.component.html',
  styleUrls: ['./employeeedit.component.css']
})
export class EmployeeeditComponent implements OnInit {
  @ViewChild(NgForm) employeeForm: NgForm;
  pageTitle = 'Employee Basic Employee Information';
  employee: Employee;
  private dataIsValid: { [key: string]: boolean } = {};
  errorMessage: string;
  messageService: any;
  constructor(private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router:Router) { }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getEditProduct(id);
    }
  }
  getEditProduct(id: number) {
    this.employeeService.getEmployeeList(id).subscribe({
      next: employee => this.employee = employee
    })
  }
  validate(): void {
    // Clear the validation object
    this.dataIsValid = {};
  }

  isValid(path?: string): boolean {
    this.validate();
    if (path) {
      return this.dataIsValid[path];
    }
    return (this.dataIsValid &&
      Object.keys(this.dataIsValid).every(d => this.dataIsValid[d] === true));
  }
  reset(): void {
    this.dataIsValid = null;
  }

  saveEmployee(): void {
    if (this.isValid()) {
      if (this.employee.id === 0) {
        this.employeeService.createEmployee(this.employee).subscribe({
          next: () => this.onSaveComplete(`The new ${this.employee.first_name} was saved`),
          error: err => this.errorMessage = err
        });
      } else {
        this.employeeService.updateProduct(this.employee).subscribe({
          next: () => this.onSaveComplete(`The updated ${this.employee.first_name} was saved`),
          error: err => this.errorMessage = err
        });
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(message?: string): void {
    if (message) {
      this.messageService.addMessage(message);
    }
    this.reset();

    // Navigate back to the product list
    this.router.navigate(['/list']);
  }

  deleteEmployee(){
    
  }

}
