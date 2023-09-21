import {CalendarTask} from "./calendar-task";

export interface CalendarDay {
  day:Date,
  today: boolean,
  tasks:CalendarTask[]
}
