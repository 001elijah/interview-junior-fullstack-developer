import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError } from 'rxjs'; 
import { Observable } from 'rxjs';
import {catchError} from 'rxjs/operators'; 
import { City } from '../City';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private apiUrl = 'http://localhost:3000/cities';
  constructor(private http: HttpClient) { }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else if (error.status === 404) { 
      return throwError(() => new Error('No cities found upon your query. Make sure your query is not misspelled. Press "Undo" and try again.'))
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  
  getCities(): Observable<City[]> {
    return this.http.get<City[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  getCity(city: string): Observable<City[]> {
    const url = `${this.apiUrl}?cityName=${city}`;
    return this.http.get<City[]>(url).pipe(catchError(this.handleError));
  }
}
