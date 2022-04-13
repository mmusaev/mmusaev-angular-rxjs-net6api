import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Weather } from "./weather";
import { catchError, EMPTY, Observable, shareReplay, tap } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  pageTitle = 'Angular with REST API';
  errorMessage = '';

  weatherForecastUrl = 'https://localhost:5001/weather';

  weathers$ = this.http.get<Weather[]>(this.weatherForecastUrl)
    .pipe(
      tap(data => console.log("Weather forecasts", JSON.stringify(data))),
      shareReplay(1),
      catchError(this.handleError)
    );


  constructor(private http: HttpClient) { }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    }
    else {
      errorMessage = `Backend returned ${err.status}: ${err.error.message}`;
    }

    console.error(err);
    return EMPTY;
  }
}
