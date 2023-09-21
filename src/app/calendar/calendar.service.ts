import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Calendar} from "./models/calendar";
import {EnvironmentService} from "../environment.service";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  constructor(private _httpClient: HttpClient,
              private _environmentService: EnvironmentService){
  }

  private _getApi(): String{
    return this._environmentService.getApiUrl();
  }

  getCalendar():Observable<Calendar> {
    return this._httpClient
      .get<Calendar>(this._getApi() + "/calendar")
      .pipe(tap(calendar => calendar.calendarDays.forEach(day => day.day = new Date(day.day))));
  }
}
