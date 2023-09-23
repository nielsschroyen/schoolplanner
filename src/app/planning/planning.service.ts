import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {EnvironmentService} from "../environment.service";
import {Planning} from "./models/planning";

@Injectable({
  providedIn: 'root'
})
export class PlanningService {
  constructor(private _httpClient: HttpClient,
              private _environmentService: EnvironmentService){
  }

  public create(planning: Planning):Observable<Planning> {
     return this._httpClient
        .post<Planning>(this._getApi() + '/planning', planning)
  }

  public update(planning: Planning):Observable<Planning> {
    return this._httpClient
        .put<Planning>(this._getApi() + '/planning/'+planning.id!, planning)
  }

  public delete(planning: Planning):Observable<boolean> {
    return this._httpClient
        .delete(this._getApi() + '/planning/'+planning.id)
        .pipe(
            map(() => true)
        );
  }

  private _getApi(): String{
    return this._environmentService.getApiUrl();
  }

  setDone(planning: Planning) {
    return this._httpClient
        .post(this._getApi() + '/planning/'+planning.id+'/done', {})
        .pipe(
            map(() => true)
        );
  }
}
