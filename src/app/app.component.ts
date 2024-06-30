import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeatherService } from './service/weather.service';
import { FutureService } from './service/future.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
selectedTemperatureUnit: any;
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  futureData: any;
  future: any;
  searchForm!: FormGroup;
  weather: any;
  forecast: any[] = [];
  currentCity: string | undefined;
  selectedCity: string = 'any';

  constructor(
    private fb: FormBuilder,
    private weatherService: WeatherService,
    private futureService: FutureService
  ) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      city: ['', Validators.required]
    });

    this.getLocation();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          this.weatherService.searchWeatherByCoords(latitude, longitude).subscribe(
            (resp) => {
              console.log(resp);
              this.weather = resp;
              this.currentCity = resp.location.name;
              this.forecast = this.weather.forecast.forecastday.slice(1, 5);
            },
            (error) => {
              console.error('Error fetching weather data:', error);
            }
          );
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  searchWeather() {
    console.log(this.searchForm.value);
    this.weatherService.searchWeather(this.searchForm.get('city')!.value).subscribe(
      (resp) => {
        console.log(resp);
        this.weather = resp;
        this.currentCity = this.searchForm.get('city')!.value;
        this.forecast = this.weather.forecast.forecastday.slice(1, 5); 
      },
      (error) => {
        console.error('Error fetching weather data:', error);
      }
    );
  }
  
  showLocation() {
    this.getLocation();
  }
}
