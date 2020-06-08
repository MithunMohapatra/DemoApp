import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { Employee } from './employee';
import { EmployeedetailsComponent } from './employeedetails.component';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employeeListUrl = 'api/employees/employees.json';

  constructor(private http: HttpClient) { }

  getEmployeeLists(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeeListUrl)
      .pipe(tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError))
  }

  getEmployeeList(id: number): Observable<Employee | undefined> {
     return this. getEmployeeLists()
    .pipe(
      map((employees: Employee[]) => employees.find(p => p.id === id))
    )
    
  }

  createEmployee(employee: Employee): Observable<Employee> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    employee.id = null;
    return this.http.post<Employee>(this.employeeListUrl, employee, { headers })
      .pipe(
        tap(data => console.log('createEmployee: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  
  updateProduct(product: Employee): Observable<Employee> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.employeeListUrl}/${product.id}`;
    return this.http.put<Employee>(url, product, { headers })
      .pipe(
        tap(() => console.log('updateProduct: ' + product.id)),
        // Return the employee on an update
        map(() => product),
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    //console.error(errorMessage);
    return throwError(errorMessage);
  }
}
