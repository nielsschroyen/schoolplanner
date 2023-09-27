import {CalendarTask} from "./calendar-task";

export interface NextTasksForPlanning {
  notFullyPlannedTasks:CalendarTask[],
  fullyPlannedTasks:CalendarTask[],
  nonPlannableTasks:CalendarTask[],
}

