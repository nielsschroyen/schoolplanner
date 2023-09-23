import {Injectable} from "@angular/core";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {filter, map, Observable} from "rxjs";
import {createModalConfirmModel} from "./confirm/modal-confirm.model";
import {ModalConfirmComponent} from "./confirm/modal-confirm.component";
import {ModalFormModel} from "./modal-form.model";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private _modalService: NgbModal){
  }

  public openConfirmModal(title:String, description:String,  deleteButton?:String):Observable<boolean>{
    let ngbModalRef:NgbModalRef  = this._modalService.open(ModalConfirmComponent );
    ngbModalRef.componentInstance.modalConfirmModel = createModalConfirmModel(title,description,deleteButton );
    return ngbModalRef.closed
      .pipe(
        filter(x=> x === 'confirm')
      );
  }

  public openFormModal<T>(componentModel:ModalFormModel<T>):Observable<T>{
    let ngbModalRef:NgbModalRef  = this._modalService.open(componentModel.component, { size: 'lg' });
    ngbModalRef.componentInstance.modalFormModel = componentModel.componentModel;
    return ngbModalRef.closed
        .pipe(
            filter(result=> !!result)
        );
  }




}
