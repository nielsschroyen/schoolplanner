import {CalendarTask} from "./calendar-task";
import {CalendarPlanning} from "./calendar-planning";

export interface CalendarDay {
  day:Date,
  today: boolean,
  tasks:CalendarTask[]
  plannings:CalendarPlanning[]
}
