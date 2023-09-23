import {Course} from "../../courses/models/course";
import {Task} from "../../tasks/models/task";
import {Planning} from "../../planning/models/planning";
import {CalendarTask} from "./calendar-task";

export interface CalendarPlanning {
  planning:Planning,
  calendarTask:CalendarTask
}
