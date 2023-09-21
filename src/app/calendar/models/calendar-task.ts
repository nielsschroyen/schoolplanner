import {Course} from "../../courses/models/course";
import {Task} from "../../models/task";

export interface CalendarTask {
  task:Task,
  course:Course
}
