export interface Task {
  id?:String,
  courseId:String,
  name:String,
  dueDate:String,
  currentProgress:number,
  totalEffort:number,
  description:String,
  explanation:String,
  materials:String,
  isExam:boolean,
}

export function createEmptyTaskForDate(date:String):Task{
  return {
    totalEffort: 10,
    currentProgress:0,
    description:' ',
    courseId: '',
    dueDate: date,
    explanation: ' ',
    name: '',
    materials: ' ',
    isExam:false,
    id:undefined
  }
}
