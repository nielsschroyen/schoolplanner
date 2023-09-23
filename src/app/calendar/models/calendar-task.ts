import {Course} from "../../courses/models/course";
import {Task} from "../../tasks/models/task";

export interface CalendarTask {
  task:Task,
  course:Course,
  totalPlannedDone:number,
  totalPlannedNotDone:number
}

export function effortWidth(effort: number, calendarTask: CalendarTask): string{
  if(calendarTask.task.totalEffort === 0){
    return '';
  }
  return (effort/calendarTask.task.totalEffort * 100) + '%';
}


export function totalPlannedDoneWidth(calendarTask: CalendarTask): string{
  if(calendarTask.task.totalEffort === 0){
    return '';
  }
  return (calendarTask.totalPlannedDone/calendarTask.task.totalEffort * 100) + '%';
}

export function totalPlannedNotDoneWidth(calendarTask: CalendarTask): string{
  if(calendarTask.task.totalEffort === 0){
    return '';
  }
  return (calendarTask.totalPlannedNotDone/calendarTask.task.totalEffort * 100) + '%';
}

