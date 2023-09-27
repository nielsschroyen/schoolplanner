import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {EnvironmentService} from "../environment.service";
import {Task} from "./models/task"
import {Course} from "../courses/models/course";
import {CalendarTask} from "../calendar/models/calendar-task";
import {NextTasksForPlanning} from "../calendar/models/next-tasks-for-planning";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private _httpClient: HttpClient,
              private _environmentService: EnvironmentService){
  }

  public create(task: Task):Observable<Task> {
     return this._httpClient
        .post<Task>(this._getApi() + '/task', task)
  }

  public update(task: Task):Observable<Task> {
    return this._httpClient
        .put<Task>(this._getApi() + '/task/'+task.id!, task)
  }

  public delete(task: Task):Observable<boolean> {
    return this._httpClient
        .delete(this._getApi() + '/task/'+task.id)
        .pipe(
            map(() => true)
        );
  }

  public listNext(date:String): Observable<NextTasksForPlanning> {
    return this._httpClient
        .get<NextTasksForPlanning>(this._getApi() + "/task/next/"+date);

  }


  private _getApi(): String{
    return this._environmentService.getApiUrl();
  }

}
