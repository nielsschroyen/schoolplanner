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

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    CalendarComponent,
    AddCourseComponent,
    DivVerticalAlignComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPopperjsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
