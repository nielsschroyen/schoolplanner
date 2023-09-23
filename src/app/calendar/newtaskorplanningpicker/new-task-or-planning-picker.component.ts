import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-new-task-or-planning-picker',
    templateUrl: './new-task-or-planning-picker.component.html',
    styleUrls: ['./new-task-or-planning-picker.component.scss']
})
export class NewTaskOrPlanningPickerComponent {

    @Input() modalFormModel?: any


    constructor( private _modal: NgbActiveModal) {

    }

    close(closeReason: string) {
        this._modal.close(closeReason);
    }
}
