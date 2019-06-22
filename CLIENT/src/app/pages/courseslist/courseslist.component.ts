import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { SessionService } from 'src/app/services/session.service';
import { Course } from 'src/app/interfaces/course';
import { switchMap, tap } from 'rxjs/operators';
import { Session } from 'src/app/interfaces/session';
import { DatatableComponent } from 'src/app/components/datatable/datatable.component';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';

@Component({
  templateUrl: './courseslist.component.html',
  styleUrls: ['./courseslist.component.css']
})
export class CourseslistComponent implements OnInit {

  @ViewChild(DatatableComponent) datatable: DatatableComponent;

  list: Course[] = [];

  private _search: string = '';

  constructor(private courseService: CourseService,
              private sessionService: SessionService) { }

  ngOnInit() {
    this.getCourses();
  }

  getCourses(): void{
    this.sessionService.getSession().pipe(
      switchMap((value: Session) =>  this.courseService.getFromCompany(value.companyId))
    ).subscribe(
      courses => {
        this.list = courses;
        if (this.list.length > 0)
          setTimeout(() => { this.datatable.load(); }, 0);
      }
    );
  }

  search(v: string) {
    this._search = v;
    this.datatable.search(this._search);
  }

}