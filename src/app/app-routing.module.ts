import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CoursesComponent} from "./courses/courses.component";
import {CalendarComponent} from "./calendar/calendar.component";

const routes: Routes = [

  { path: 'kalender', component: CalendarComponent },
  { path: 'vakken', component: CoursesComponent },
  { path: '', redirectTo: '/kalender',  pathMatch: 'full' },
  { path: '**', redirectTo: '/kalender',  pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
