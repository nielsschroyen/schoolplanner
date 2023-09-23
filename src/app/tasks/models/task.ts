export interface Task {
  id?:String,
  courseId:String,
  name:String,
  dueDate:String,
  currentProgress:number,
  totalEffort:number,
  description:String,
  explanation:String,
  materials:String
}

export function createEmptyTaskForDate(date:String):Task{
  return {
    totalEffort: 10,
    currentProgress:0,
    description:'beschrijving',
    courseId: '5b27d66d-8e21-4789-ac0f-98e694334bf0',
    dueDate: date,
    explanation: 'uitleg',
    name: 'Toets thema 4',
    materials: 'boekje',
    id:undefined
  }
}
