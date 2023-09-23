import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Task} from "../models/task";
import {TaskService} from "../task.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {CourseService} from "../../courses/course.service";
import {Observable} from "rxjs";
import {Course} from "../../courses/models/course";
import {overwriteWith} from "../../utils/functions/function.utils";
import {ModalService} from "../../utils/modals/modal.service";

@Component({
    selector: 'app-edit-task',
    templateUrl: './edit-task.component.html',
    styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

    @Input() modalFormModel?: Task
    courses$?: Observable<Course[]>;

    updateTaskForm: FormGroup = new FormGroup({
            courseId: new FormControl('', [Validators.required]),
            name: new FormControl('', [Validators.required]),
            description: new FormControl('', [Validators.required]),
            explanation: new FormControl('', [Validators.required]),
            materials: new FormControl('', [Validators.required]),
            totalEffort: new FormControl('', [Validators.required]),
        }
    );


    constructor(private _taskService: TaskService,
                private _modal: NgbActiveModal,
                private _courseService: CourseService,
                private _modalService:ModalService) {

    }

    get name() {
        return this.updateTaskForm.get('name');
    }

    get courseId() {
        return this.updateTaskForm.get('courseId');
    }

    get description() {
        return this.updateTaskForm.get('description');
    }

    get explanation() {
        return this.updateTaskForm.get('explanation');
    }

    get materials() {
        return this.updateTaskForm.get('materials');
    }

    get totalEffort() {
        return this.updateTaskForm.get('totalEffort');
    }

    ngOnInit(): void {
        this.courses$ = this._courseService.listCourses();
        this.updateTaskForm.patchValue(this.modalFormModel!);
    }

    dismiss() {
        this._modal.close(undefined);
    }

    confirm() {
        let updatedTask: Task = overwriteWith(this.modalFormModel!, this.updateTaskForm.value);
        this._taskService.update(updatedTask)
            .subscribe((task: Task) => {
                this._modal.close(task);
            });
    }

    delete() {
        this._modalService.openConfirmModal("Verwijder taak", "Ben je zeker dat je deze taak verwijderen wil?")
            .subscribe(()=>this.deleteTask());
    }

    deleteTask(){
        this._taskService.delete(this.modalFormModel!)
            .subscribe(()=>this._modal.close('deleted'));
    }
}
