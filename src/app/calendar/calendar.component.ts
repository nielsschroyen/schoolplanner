import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Calendar} from "./models/calendar";
import {CalendarService} from "./calendar.service";
import {CalendarDay} from "./models/calendar-day";
import {CalendarTask} from "./models/calendar-task";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit{

  calendar$?: Observable<Calendar>;

  constructor(private _calendarService: CalendarService){

  }

  ngOnInit(): void {
    this.calendar$ = this._calendarService.getCalendar();
  }

  isMonday(calendarDay: CalendarDay):boolean {
    return calendarDay.day.getDay() === 1;
  }

  getProgress(task: CalendarTask) {
    return task.task.currentProgress / task.task.totalEffort * 100
  }
}
