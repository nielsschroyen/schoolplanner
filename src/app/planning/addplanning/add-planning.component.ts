import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {BehaviorSubject, Observable} from "rxjs";
import {overwriteWith} from "../../utils/functions/function.utils";
import {PlanningService} from "../planning.service";
import {CalendarTask, effortWidth, totalPlannedDoneWidth} from "../../calendar/models/calendar-task";
import {TaskService} from "../../tasks/task.service";
import {Planning} from "../models/planning";

@Component({
    selector: 'app-add-planning',
    templateUrl: './add-planning.component.html',
    styleUrls: ['./add-planning.component.scss']
})
export class AddPlanningComponent implements OnInit {

    @Input() modalFormModel?: Planning
    calendarTasks$: BehaviorSubject<CalendarTask[]> = new BehaviorSubject<CalendarTask[]>([]);
    selectedCalendarTask?: CalendarTask;

    protected readonly totalPlannedDoneWidth = totalPlannedDoneWidth;
    protected readonly effortWidth = effortWidth;

    addPlanningForm: FormGroup = new FormGroup({
            taskId: new FormControl('', [Validators.required]),
            description: new FormControl('', [Validators.required]),
            effort: new FormControl('', [Validators.required]),
        }
    );


    constructor(private _taskService: TaskService,
                private _modal: NgbActiveModal,
                private _planningService: PlanningService) {

    }

    get taskId() {
        return this.addPlanningForm.get('taskId');
    }

    get description() {
        return this.addPlanningForm.get('description');
    }

    get effort() {
        return this.addPlanningForm.get('effort');
    }

    ngOnInit(): void {
         this._taskService.listNext(this.modalFormModel!.plannedDate)
            .subscribe(x=> this.calendarTasks$.next(x));
        this.addPlanningForm.patchValue(this.modalFormModel!);
    }

    dismiss() {
        this._modal.close(undefined);
    }

    confirm() {
        let newPlanning: Planning = overwriteWith(this.modalFormModel!, this.addPlanningForm.value);
        this._planningService.create(newPlanning)
            .subscribe((planning: Planning) => {
                this._modal.close(planning);
            });
    }

    selectCalendarTask() {
        let selectedTaskId = this.addPlanningForm.get('taskId')?.value
        if(selectedTaskId){
            this.selectedCalendarTask  = this.calendarTasks$.value.find(x=> x.task.id === selectedTaskId)
        }else{
            this.selectedCalendarTask = undefined;
        }
    }


    currentEffort(calendarTask: CalendarTask):number {
        let effort = this.addPlanningForm.get('effort')?.value;
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
}
