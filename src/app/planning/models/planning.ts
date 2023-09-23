export interface Planning {
  id?:String,
  taskId?:String,
  plannedDate:String,
  effort:number,
  description:String,
  done:boolean,
}

export function createEmptyPlanningForDate(date:String):Planning{
  return {
    id:undefined,
    effort: 1,
    description:' ',
    taskId: undefined,
    plannedDate: date,
    done: false,
  }
}
