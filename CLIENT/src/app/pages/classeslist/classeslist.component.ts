import { Component, OnInit, ViewChild } from '@angular/core';
import { ClassesService } from 'src/app/services/classes.service';
import { Class } from 'src/app/interfaces/class';
import { ActivatedRoute, Router } from '@angular/router';
import { DatatableComponent } from 'src/app/components/datatable/datatable.component';

@Component({
  templateUrl: './classeslist.component.html',
  styleUrls: ['./classeslist.component.css']
})
export class ClasseslistComponent implements OnInit {
  @ViewChild(DatatableComponent) datatable: DatatableComponent;

  courseId: string =  this.activateRoute.snapshot.paramMap.get("id");
  classes: Class[];
  constructor(private classService: ClassesService,
    private activateRoute: ActivatedRoute,
    private route: Router) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.datatable.destroy();
    this.classService.getFromCourse(this.courseId).subscribe(
      x => {
        this.classes = x;
        console.log(x);
        setTimeout(() => {
          this.datatable.load();
        }, 0);
      }
    );
  }

  receiveCourseId(Eventarg) {
    this.courseId = Eventarg;
    this.getAll();
    this.route.navigateByUrl(`/main/classeslist/${this.courseId}`);
  }

  classConfirm(c:Class) {
    this.classService.confirm(c.id).subscribe( () => {
      //this.classes.find((c: Class) => c.id == id).confirmationSent = true;
      c.confirmationSent = true;
    });
  }

  classCanBeConfirmed (c: Class) {
    let now = (Date.now()/1000) | 0;
    return (c.tsIni > now) && !( c.confirmationSent);
  }
}
