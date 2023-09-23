import {Course} from "../../courses/models/course";
import {Task} from "../../tasks/models/task";

export interface CalendarTask {
  task:Task,
  course:Course
}
