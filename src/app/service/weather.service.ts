import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = 'dcdf701f709543cc831120205242906';
  private apiUrl = 'http://api.weatherapi.com/v1/forecast.json';

  constructor(private http: HttpClient) { }

  searchWeatherByLocation(city: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('weatherapi-key', this.apiKey)
      .set('weatherapi-host', 'api.weatherapi.com');

    const options = { headers };
    const url = `${this.apiUrl}?key=${this.apiKey}&q=${city}`;

    return this.http.get(url, options);
  }

  searchWeather(city: string): Observable<any> {
    const url = `${this.apiUrl}?key=${this.apiKey}&q=${city}&days=5`;
    return this.http.get(url);
  }

  searchWeatherByCoords(latitude: number, longitude: number): Observable<any> {
    const url = `${this.apiUrl}/forecast.json?key=${this.apiKey}&q=${latitude},${longitude}&days=5`;
    return this.http.get(url);
  }
}
