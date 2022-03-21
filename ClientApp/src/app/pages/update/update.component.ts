import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WeatherService } from 'src/app/services/weather.service';
import { Weather } from '../weather';
import { IWeather } from './IWeather';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  @Input() currentWeatherInfo: IWeather | undefined;
  weatherForm!: FormGroup;
  submitted: boolean = false;
  weather: Weather = {
    temperature: '',
    tempDate: '',
    id: 0,
  };
  weatherId: number = 0;

  constructor(
    private weatherService: WeatherService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    //Reactive form
    this.weatherForm = this.fb.group({
      temperature: new FormControl('', Validators.required),
      tempDate: new FormControl('', Validators.required),
    });

    if (
      this.currentWeatherInfo !== undefined &&
      this.currentWeatherInfo != null
    ) {
      this.weather.id = this.currentWeatherInfo.Id;
      this.weather.tempDate = new Date(this.currentWeatherInfo.TempDate)
        .toISOString()
        .split('T')[0];
      this.weather.temperature = this.currentWeatherInfo.Temperature;
    }
   
  }

  //Update method to update weather  record
  updateWeather() {
    if (this.weather != null) {
      this.weatherService.update(this.weather).subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
          this.closePopup();
        },
        error: (e) => console.error(e),
      });
    }
  }

  //Delete Method to remove weather record from db
  delete(id: number | undefined) {
    if (id! > 0) {
      this.weatherService.delete(id!).subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
          this.closePopup();
        },
        error: (e) => console.error(e),
      });
    }
    this.router.navigate(['list']);
  }

  errorHandling = (control: string, error: string) => {
    return this.weatherForm.controls[control].hasError(error);
  };

  ngOnChanges() {
    
  }

  closePopup() {
    this.modalService.dismissAll();
  }
}
