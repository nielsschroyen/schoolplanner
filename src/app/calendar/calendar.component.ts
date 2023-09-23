import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {Calendar} from "./models/calendar";
import {CalendarService} from "./calendar.service";
import {CalendarDay} from "./models/calendar-day";
import {CalendarTask, effortWidth, totalPlannedDoneWidth, totalPlannedNotDoneWidth} from "./models/calendar-task";
import {ModalService} from "../utils/modals/modal.service";
import {AddTaskComponent} from "../tasks/addtask/add-task.component";
import {createEmptyTaskForDate, Task} from "../tasks/models/task";
import {dateToYYYYMMDD} from "../utils/functions/function.date";
import {EditTaskComponent} from "../tasks/edittask/edit-task.component";
import {NewTaskOrPlanningPickerComponent} from "./newtaskorplanningpicker/new-task-or-planning-picker.component";
import {AddPlanningComponent} from "../planning/addplanning/add-planning.component";
import {createEmptyPlanningForDate, Planning} from "../planning/models/planning";
import {CalendarPlanning} from "./models/calendar-planning";
import {EditPlanningComponent} from "../planning/editplanning/edit-planning.component";
import {ViewportScroller} from "@angular/common";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit{

  calendar$?: BehaviorSubject<Calendar>;

  constructor(private _calendarService: CalendarService,
              private _modalService : ModalService,
              private _viewportScroller: ViewportScroller,
              ){
  }

  ngOnInit(): void {
    this._reload();
  }

  isMonday(calendarDay: CalendarDay):boolean {
    return calendarDay.day.getDay() === 1;
  }

  getProgress(task: CalendarTask) {
    return task.task.currentProgress / task.task.totalEffort * 100
  }

  addTaskOrPlanning(calendarDay: CalendarDay){
    this._modalService.openFormModal<any>({
      componentModel:{},
      component: NewTaskOrPlanningPickerComponent
    }).subscribe((result)=>{
      if(result === 'task'){
        this.addTask(calendarDay);
      }
      if(result === 'planning'){
        this.addPlanning(calendarDay);
      }
    });

  }

  addTask(calendarDay: CalendarDay) {
    this._modalService.openFormModal<Task>({
      componentModel:createEmptyTaskForDate(dateToYYYYMMDD(calendarDay.day)),
      component: AddTaskComponent
    }).subscribe(()=>this._reload());
  }

  addPlanning(calendarDay: CalendarDay) {
    this._modalService.openFormModal<Planning>({
      componentModel:createEmptyPlanningForDate(dateToYYYYMMDD(calendarDay.day)),
      component: AddPlanningComponent
    }).subscribe(()=>this._reload());
  }

  updateTask(calendarTask: CalendarTask) {
    this._modalService.openFormModal<Task>({
      componentModel:calendarTask.task,
      component: EditTaskComponent
    }).subscribe(()=>this._reload());
  }

  updatePlanning(planning: CalendarPlanning) {
    this._modalService.openFormModal<Planning>({
      componentModel:planning.planning,
      componentExtraData:planning,
      component: EditPlanningComponent
    }).subscribe(()=>this._reload());

  }

  protected readonly totalPlannedDoneWidth = totalPlannedDoneWidth;
  protected readonly effortWidth = effortWidth;

  remainingEffort(calendarTask: CalendarTask) {
    let remainingEffort = calendarTask.task.totalEffort - (calendarTask.totalPlannedNotDone + calendarTask.totalPlannedDone);
    return remainingEffort < 0 ?0 : remainingEffort ;
  }

  private _reload(){
    this._calendarService.getCalendar().subscribe(x=>
        this._loadCalendar(x));
  }

  private _loadCalendar(calendar: Calendar){
    let scrollPosition = this._viewportScroller.getScrollPosition();
    if(this.calendar$ == null){
      this.calendar$ = new BehaviorSubject<Calendar>(calendar);
    }else{
      this.calendar$.next(calendar)
    }
    this._viewportScroller.scrollToPosition(scrollPosition);
  }

  protected readonly totalPlannedNotDoneWidth = totalPlannedNotDoneWidth;
}
