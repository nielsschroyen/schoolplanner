import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Course} from "./models/course";
import {map, Observable, tap} from "rxjs";
import {EnvironmentService} from "../environment.service";

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(private _httpClient: HttpClient,
              private _environmentService: EnvironmentService){
  }

  public listCourses(): Observable<Course[]> {
    return this._httpClient
         .get<Course[]>(this._getApi() + "/course");

  }

  public create(course: Course):Observable<Course> {
     return this._httpClient
        .post<Course>(this._getApi() + '/course', course)
  }

  public update(course: Course):Observable<Course> {
    return this._httpClient
      .put<Course>(this._getApi() + '/course/'+course.id, course)
  }

    public delete(course: Course):Observable<boolean> {
        return this._httpClient
            .delete(this._getApi() + '/course/'+course.id)
            .pipe(
              map(() => true)
            );
    }

  private _getApi(): String{
    return this._environmentService.getApiUrl();
  }


}
