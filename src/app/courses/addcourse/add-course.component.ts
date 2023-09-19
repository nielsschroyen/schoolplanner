import {Component, OnInit} from '@angular/core';
import {Course} from "../../models/course";

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

  model: Course = {
    name: '',
    description: ''
  };

  onSubmit() { }


  ngOnInit(): void {
  }

}
