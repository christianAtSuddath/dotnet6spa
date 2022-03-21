import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  @Input() weatherDataList: Array<any> = [];
  @Output() newClicked = new EventEmitter<any>();
  constructor() {
    
  }
  
  newRecord() {
    this.newClicked.emit();
  }
}

// interface WeatherForecast {
//   date: string;
//   temperatureC: number;
//   temperatureF: number;
//   summary: string;
// }
