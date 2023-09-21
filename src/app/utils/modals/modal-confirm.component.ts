import { Component } from '@angular/core';


@Component({
  selector: 'modal-confirm',
  templateUrl: 'modal-confirm.component.html',
  standalone:true
})
export class ModalConfirm {
  constructor(public modal: NgbActiveModal) {}
}
