import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Course} from "./models/course";
import {CourseService} from "./course.service";
import {ModalService} from "../utils/modals/modal.service";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit{

  courses$?: Observable<Course[]>;

  constructor(private _courseService: CourseService,
              private _modalService: ModalService,
  ){

  }

  ngOnInit(): void {
    this.courses$ = this._courseService.listCourses();
  }

  onCourseAdded(course:Course) {
    this.courses$ = this._courseService.listCourses();
  }

  onDelete(course: Course){
    this._modalService.openConfirmModal("Verwijder vak", "Ben je zeker dat je dit vak verwijderen wil?")
      .subscribe(()=>this.deleteCourse(course));
  }

  private deleteCourse(course: Course) {
    this._courseService.delete(course)
      .subscribe(()=>{
          this.courses$ = this._courseService.listCourses();
      });
  }
}
