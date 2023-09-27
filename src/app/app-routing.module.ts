import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CoursesComponent} from "./courses/courses.component";
import {CalendarComponent} from "./calendar/calendar.component";
import {TenantHeaderInterceptor} from "./utils/tenant-header-interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";

const routes: Routes = [
  {
    path: ':tenantId',
    children: [
      {path: 'kalender', component: CalendarComponent},
      {path: 'vakken', component: CoursesComponent},
    ]
  },
  {path: '', redirectTo: '/lowie/kalender', pathMatch: 'full'},
  {path: '**', redirectTo: '/lowie/kalender', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TenantHeaderInterceptor,
    multi: true,
  }],
})
export class AppRoutingModule {
}
