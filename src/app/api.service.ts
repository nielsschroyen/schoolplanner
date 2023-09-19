import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Course} from "./models/course";
import {Observable, tap} from "rxjs";
import {EnvironmentService} from "./environment.service";
import {Calendar} from "./models/calendar/calendar";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private _httpClient: HttpClient,
              private _environmentService: EnvironmentService){
  }

  public listCourses(): Observable<Course[]> {
    return this._httpClient
         .get<Course[]>(this._getApi() + "/courses");
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
