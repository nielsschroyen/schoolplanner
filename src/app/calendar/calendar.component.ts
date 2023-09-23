import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Calendar} from "./models/calendar";
import {CalendarService} from "./calendar.service";
import {CalendarDay} from "./models/calendar-day";
import {CalendarTask} from "./models/calendar-task";
import {ModalService} from "../utils/modals/modal.service";
import {AddTaskComponent} from "../tasks/addtask/add-task.component";
import {createEmptyTaskForDate, Task} from "../tasks/models/task";
import {dateToYYYYMMDD} from "../utils/functions/function.date";
import {EditTaskComponent} from "../tasks/edittask/edit-task.component";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit{

  calendar$?: Observable<Calendar>;

  constructor(private _calendarService: CalendarService,
              private _modalService : ModalService
              ){
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

  addTask(calendarDay: CalendarDay) {
    this._modalService.openFormModal<Task>({
      componentModel:createEmptyTaskForDate(dateToYYYYMMDD(calendarDay.day)),
      component: AddTaskComponent
    }).subscribe(()=>this.calendar$ = this._calendarService.getCalendar());
  }

  updateTask(calendarTask: CalendarTask) {
    this._modalService.openFormModal<Task>({
      componentModel:calendarTask.task,
      component: EditTaskComponent
    }).subscribe(()=>this.calendar$ = this._calendarService.getCalendar());
  }
}
