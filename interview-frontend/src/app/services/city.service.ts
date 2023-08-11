import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { throwError } from 'rxjs'; 
import { Observable } from 'rxjs';
import {catchError} from 'rxjs/operators'; 
import { City } from '../City';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  constructor(private http: HttpClient) { }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else if (error.status === 404) { 
      return throwError(() => new Error('No cities found upon your query. Make sure your query is not misspelled. Press "Undo" and try again.'))
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  
  getCities(page: number = environment.page, limit: number = environment.limit): Observable<City[]> {
    const url = `${environment.apiUrl}?page=${page}&limit=${limit}`;
    return this.http.get<City[]>(url).pipe(catchError(this.handleError));
  }

  getCity(city: string, page: number = environment.page, limit: number = environment.limit): Observable<City[]> {
    const url = `${environment.apiUrl}?cityName=${city}&page=${page}&limit=${limit}`;
    return this.http.get<City[]>(url).pipe(catchError(this.handleError));
  }
}
