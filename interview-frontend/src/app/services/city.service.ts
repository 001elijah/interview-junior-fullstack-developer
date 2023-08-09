import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { City } from '../City';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private apiUrl = 'http://localhost:5000/cities';

  constructor(private http: HttpClient) { }
  
  getCities(): Observable<City[]> {
    return this.http.get<City[]>(this.apiUrl);
  }

  getCity(city: string): Observable<City[]> {
    const url = `${this.apiUrl}/?cityName=${city}`;
    return this.http.get<City[]>(url);
  }
}
