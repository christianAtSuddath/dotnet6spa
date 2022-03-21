import { Component, OnInit, ViewChild } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Weather } from '../weather';
import { IWeather } from '../update/IWeather';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @ViewChild("editForm") editForm:any;
  weatherDataList? : Weather[];
  editWeather?: IWeather;
 
  constructor(private weatherService:WeatherService,
    private modalService: NgbModal,) { }

  ngOnInit(): void {
    this.getAllWeatherData();
  }
  getAllWeatherData(): void {

    // this.weatherService.getAll()
    // .subscribe(data=>{
    //   this.weatherDataList = data;
    // });
    this.weatherService.getAll()
      .subscribe({
        next: (data: Weather[]) => {
          if(data != null){
          this.weatherDataList = data;
          console.log(data);
          console.log("Total count:"+data.length);
          }
        },
        error: (e) => console.error(e)
      });
  }

  convertToJSON(product: any) {
    return JSON.parse(product);
}

/***************UPDATE*************** */
UpdateWeather(data:Weather){
  this.editWeather = {
    Id: data.id,
    TempDate: data.tempDate,
    Temperature: data.temperature
  };
  this.modalService.open(this.editForm,{
    windowClass: "editWeather",
  });
}



/************************************* */
}
