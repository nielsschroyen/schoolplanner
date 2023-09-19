import {Component, OnInit} from '@angular/core';
import {ApiService} from "../api.service";
import {Observable} from "rxjs";
import {Calendar} from "../models/calendar/calendar";
import {CalendarDay} from "../models/calendar/calendar-day";
import {CalendarTask} from "../models/calendar/calendar-task";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit{

  calendar$?: Observable<Calendar>;

  constructor(private _apiService: ApiService){

  }

  ngOnInit(): void {
    this.calendar$ = this._apiService.getCalendar();
  }

  isMonday(calendarDay: CalendarDay):boolean {
    return calendarDay.day.getDay() === 1;
  }

  getProgress(task: CalendarTask) {
    return task.task.currentProgress / task.task.totalEffort * 100
  }
}
