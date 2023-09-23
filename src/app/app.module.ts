import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import {HttpClientModule} from "@angular/common/http";
import {CalendarComponent} from "./calendar/calendar.component";
import {AddCourseComponent} from "./courses/addcourse/add-course.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DivVerticalAlignComponent} from "./utils/div-vertical-align.component";
import {NgxPopperjsModule} from "ngx-popperjs";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AddTaskComponent} from "./tasks/addtask/add-task.component";
import {ModalConfirmComponent} from "./utils/modals/confirm/modal-confirm.component";
import {EditTaskComponent} from "./tasks/edittask/edit-task.component";
import {
  NewTaskOrPlanningPickerComponent
} from "./calendar/newtaskorplanningpicker/new-task-or-planning-picker.component";
import {AddPlanningComponent} from "./planning/addplanning/add-planning.component";
import {EditPlanningComponent} from "./planning/editplanning/edit-planning.component";

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    CalendarComponent,
    AddCourseComponent,
    AddTaskComponent,
    EditTaskComponent,
    AddPlanningComponent,
    EditPlanningComponent,
    NewTaskOrPlanningPickerComponent,
    DivVerticalAlignComponent,
    ModalConfirmComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPopperjsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
