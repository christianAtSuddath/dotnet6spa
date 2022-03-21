// import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { WeatherService } from 'src/app/services/weather.service';
import { AddComponent } from './add.component';

// import { AddComponent } from './add.component';

// describe('AddComponent', () => {
//   let component: AddComponent;
//   let fixture: ComponentFixture<AddComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ AddComponent ]
//     })
//     .compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(AddComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
describe('Add temperature', () => {
  let component: AddComponent;
  let weatherService: WeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeatherService],
    });
    weatherService = TestBed.inject(WeatherService);
    component = TestBed.inject(AddComponent);
  });
  
  it('Validate add parameters', () => {
    expect(weatherService).toBeDefined();
  });
  
  it('Validate add parameters', () => {
    expect(weatherService).toBeDefined();
  });
});
