import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IWeather } from '../pages/update/IWeather';
import { Weather } from '../pages/weather';

const httpOptionsPlain = {
  headers: new HttpHeaders({
    'Accept': 'text/plain',
    'Content-Type': 'text/plain'
  }),
  responseType: 'text'
};

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private accessPointUrl: string = 'https://localhost:44449';
  private _baseUrl:string = "";
  private headers: HttpHeaders;
  
 
  constructor(private httpClient: HttpClient, @Inject('BASE_URL') baseUrl: string) { 
    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    this._baseUrl = baseUrl+"weather";
  }

  getAll():Observable<Weather[]>{
    return this.httpClient.get<Weather[]>(this._baseUrl+"/getall", { responseType: 'text' as 'json' });
  }
  
    add(weather:any): Observable<any>{
    return this.httpClient.post(this._baseUrl+"/add", weather, {headers: this.headers});
  }

  update(weather:Weather){
    return this.httpClient.put<Weather>(this._baseUrl+"/update/",weather, {headers: this.headers}) ;
  }

  delete(Id: number){
    let httpParams = new HttpParams().set("Id",Id);
    let options = { params: httpParams };

    return this.httpClient.delete<Weather>(this._baseUrl+"/delete/",options);
  }
    
}
