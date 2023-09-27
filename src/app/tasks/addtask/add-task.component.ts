import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Task} from "../models/task";
import {TaskService} from "../task.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {CourseService} from "../../courses/course.service";
import {Observable} from "rxjs";
import {Course} from "../../courses/models/course";
import {overwriteWith} from "../../utils/functions/function.utils";

@Component({
    selector: 'app-add-task',
    templateUrl: './add-task.component.html',
    styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

    @Input() modalFormModel?: Task
    courses$?: Observable<Course[]>;

    addTaskForm: FormGroup = new FormGroup({
            courseId: new FormControl('', [Validators.required]),
            name: new FormControl('', [Validators.required]),
            description: new FormControl('', [Validators.required]),
            explanation: new FormControl('', [Validators.required]),
            materials: new FormControl('', [Validators.required]),
            isExam: new FormControl('', []),
            totalEffort: new FormControl('', [Validators.required]),
        }
    );

    constructor(private _taskService: TaskService,
                private _modal: NgbActiveModal,
                private _courseService: CourseService) {

    }

    get name() {
        return this.addTaskForm.get('name');
    }

    get courseId() {
        return this.addTaskForm.get('courseId');
    }

    get description() {
        return this.addTaskForm.get('description');
    }

    get explanation() {
        return this.addTaskForm.get('explanation');
    }

    get materials() {
        return this.addTaskForm.get('materials');
    }

    get totalEffort() {
        return this.addTaskForm.get('totalEffort');
    }

    ngOnInit(): void {
        this.courses$ = this._courseService.listCourses();
        this.addTaskForm.patchValue(this.modalFormModel!);
    }

    dismiss() {
        this._modal.close(undefined);
    }

    confirm() {
        let newTask: Task = overwriteWith(this.modalFormModel!, this.addTaskForm.value);
        this._taskService.create(newTask)
            .subscribe((task: Task) => {
                this._modal.close(task);
            });
    }
}
