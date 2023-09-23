import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Course} from "../models/course";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CourseService} from "../course.service";
import {assignToType} from "../../utils/functions/function.utils";

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

  @Output() onCourseAdded:EventEmitter<Course> = new EventEmitter<Course>();

  addCourseForm: FormGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('',[Validators.required]),
    }
  );


  constructor(private _courseService: CourseService){

  }

  get name() { return this.addCourseForm.get('name'); }
  get description() { return this.addCourseForm.get('description'); }

  onSubmit() {
    this._courseService.create(assignToType<Course>(this.addCourseForm.value))
      .subscribe((course:Course)=>{
        this.onCourseAdded.emit(course);
        this.addCourseForm.reset();
      });
  }

  ngOnInit(): void {
  }

}
