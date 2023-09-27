import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'schoolplanner-fe';

  constructor(private router: Router, private route:ActivatedRoute) {
    // ...
  }

  getTenantName(): String{
    return window.location.href.split("/")[3].toLowerCase();

  }

  goToCalendar() {
    this.router.navigate(['[../kalender'], { relativeTo: this.route });
  }

  goToCourses() {
    this.router.navigate(['../vakken'], { relativeTo: this.route });
  }
}
