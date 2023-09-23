import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {BehaviorSubject, Observable} from "rxjs";
import {overwriteWith} from "../../utils/functions/function.utils";
import {PlanningService} from "../planning.service";
import {CalendarTask, effortWidth, totalPlannedDoneWidth} from "../../calendar/models/calendar-task";
import {TaskService} from "../../tasks/task.service";
import {Planning} from "../models/planning";
import {ModalService} from "../../utils/modals/modal.service";

@Component({
    selector: 'app-edit-planning',
    templateUrl: './edit-planning.component.html',
    styleUrls: ['./edit-planning.component.scss']
})
export class EditPlanningComponent implements OnInit {

    @Input() modalFormModel?: Planning
    calendarTasks$: BehaviorSubject<CalendarTask[]> = new BehaviorSubject<CalendarTask[]>([]);
    selectedCalendarTask?: CalendarTask;

    protected readonly totalPlannedDoneWidth = totalPlannedDoneWidth;
    protected readonly effortWidth = effortWidth;

    editPlanningForm: FormGroup = new FormGroup({
            taskId: new FormControl('', [Validators.required]),
            description: new FormControl('', [Validators.required]),
            effort: new FormControl('', [Validators.required]),
        }
    );


    constructor(private _taskService: TaskService,
                private _modal: NgbActiveModal,
                private _planningService: PlanningService,
                private _modalService:ModalService) {

    }

    get taskId() {
        return this.editPlanningForm.get('taskId');
    }

    get description() {
        return this.editPlanningForm.get('description');
    }

    get effort() {
        return this.editPlanningForm.get('effort');
    }

    ngOnInit(): void {
         this._taskService.listNext(this.modalFormModel!.plannedDate)
            .subscribe(x=> this.calendarTasks$.next(x));
        this.editPlanningForm.patchValue(this.modalFormModel!);
    }

    dismiss() {
        this._modal.close(undefined);
    }

    confirm() {
        let newPlanning: Planning = overwriteWith(this.modalFormModel!, this.editPlanningForm.value);
        this._planningService.create(newPlanning)
            .subscribe((planning: Planning) => {
                this._modal.close(planning);
            });
    }

    selectCalendarTask() {
        let selectedTaskId = this.editPlanningForm.get('taskId')?.value
        if(selectedTaskId){
            this.selectedCalendarTask  = this.calendarTasks$.value.find(x=> x.task.id === selectedTaskId)
        }else{
            this.selectedCalendarTask = undefined;
        }
    }


    currentEffort(calendarTask: CalendarTask):number {
        let effort = this.editPlanningForm.get('effort')?.value;
        if(effort){
            return parseInt(effort, 10) + calendarTask.totalPlannedNotDone;
        }else{

            return calendarTask.totalPlannedNotDone
        }
    }

    remainingEffort(calendarTask: CalendarTask):number {
        let remainingEffort = calendarTask.task.totalEffort - (this.currentEffort(calendarTask) + calendarTask.totalPlannedDone);
        return remainingEffort < 0 ?0 : remainingEffort ;
    }

    delete() {
        this._modalService.openConfirmModal("Verwijder planning", "Ben je zeker dat je deze planning verwijderen wil?")
            .subscribe(()=>this.deletePlanning());
    }

    deletePlanning(){
        this._planningService.delete(this.modalFormModel!)
            .subscribe(()=>this._modal.close('deleted'));
    }

    done() {
        this._modalService.openConfirmModal("Klaar", "Ben je klaar met je huiswerk?")
            .subscribe(()=>this.setDone());
    }


    setDone(){
        this._planningService.setDone(this.modalFormModel!)
            .subscribe(()=>this._modal.close('done'));
    }
}
