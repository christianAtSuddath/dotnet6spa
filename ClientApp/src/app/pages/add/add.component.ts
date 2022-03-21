import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { WeatherService } from 'src/app/services/weather.service';
import { Weather } from '../weather';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'], 
})
export class AddComponent implements OnInit {
  weather: Weather = {
    temperature: '',
    tempDate: '',
  };
  submitted: boolean = false;
  @Input() weatherInfo: any;
  weatherForm!: FormGroup;
  public buttonText = 'Save';
  title = "Add";
  constructor(
    private weatherService: WeatherService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    //Reactive form
    this.weatherForm = this.fb.group({
      temperature: new FormControl('', Validators.required),
      tempDate: new FormControl('', Validators.required),
    });
  }

  errorHandling = (control: string, error: string) => {
    return this.weatherForm.controls[control].hasError(error);
  }

  //Add weather data
  addWeather() {
    const data = {
      temperature: this.weather.temperature,
      tempDate: new Date(this.weather.tempDate).toISOString().split('T')[0]
    };
      if(data.tempDate != "" && data.temperature != ""){
      this.weatherService.add(data).subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
          this.clearWeather();
        },
        error: (e) => console.error(e),
      });
    }
  }
  
  clearWeather(): void {
    this.weather = {
      temperature: '',
      tempDate: '',
    };
  }

}
