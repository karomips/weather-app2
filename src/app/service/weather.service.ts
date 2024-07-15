import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiBaseUrl = 'http://localhost/demoproject3/api/';
  private cache: { [city: string]: BehaviorSubject<any> } = {};

  constructor(private http: HttpClient) {}

  fetchWeather(city: string): Observable<any> {
    const url = `${this.apiBaseUrl}weather/${city}`;
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  searchWeatherByLocation(city: string): Observable<any> {
    if (!this.cache[city]) {
      this.cache[city] = new BehaviorSubject<any>(null);
      this.fetchWeather(city).subscribe(
        (data) => this.cache[city].next(data),
        (error) => console.error('Error fetching weather data:', error)
      );
    }
    return this.cache[city].asObservable();
  }

  clearCache(city: string) {
    if (this.cache[city]) {
      this.cache[city].complete();
      delete this.cache[city];
    }
  }

  searchWeather(city: string): Observable<any> {
    const url = `${this.apiBaseUrl}weather/${city}`;
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  searchWeatherByCoords(latitude: number, longitude: number): Observable<any> {
    console.log(`Searching weather by coords: ${latitude}, ${longitude}`);
    const url = `${this.apiBaseUrl}weather-lat-lon/${latitude}/${longitude}`;
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server-side error: ${error.status} ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
