import {Component, Input} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalConfirmModel} from "./modal-confirm.model";

@Component({
  selector: 'modal-confirm-autofocus',
  templateUrl: './modal-confirm.component.html',
})
export class ModalConfirmComponent {

  @Input() public modalConfirmModel?:ModalConfirmModel;

  constructor(public modal: NgbActiveModal) {}
}
