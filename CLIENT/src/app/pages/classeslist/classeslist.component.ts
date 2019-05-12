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

  //id = +this.activateRoute.snapshot.paramMap.get("id");
  courseId: number =  +this.activateRoute.snapshot.paramMap.get("id");
  classes: Class[];// = [];
  constructor(private classService: ClassesService,
    private activateRoute: ActivatedRoute,
    private route: Router) { }

  ngOnInit() {
    //this.ShowCertainCourse();
    this.getAll();
  }

  getAll() {
    
    if(this.courseId) {
      //this.courseId = this.id;
      this.datatable.destroy();
      this.classService.getFromCourse(this.courseId).subscribe(
        x => {
          this.classes = x;
          setTimeout(() => {
            this.datatable.load();
          }, 0);
        }
      )
    }
    else {
      this.route.navigateByUrl("/main/classeslist");
    }
  }

  



  /*
  getAll() {
    this.datatable.destroy();
    this.classService.getFromCourse(this.courseId).subscribe(
      x => {
        this.classes = x;
        setTimeout(() => {
          this.datatable.load();
        }, 0);
        console.log(x, this.classes);
      }
    )

  }

  */
  receiveCourseId(Eventarg) {
    this.courseId = Eventarg;
    this.getAll();
    this.route.navigateByUrl(`main/classeslist/${this.courseId}`);
    console.log("select", this.courseId)
  }
  /*
  ShowCertainCourse() {
    const id = +this.activateRoute.snapshot.paramMap.get("id");
    if (id) {
      this.courseId = id;
      this.classService.getFromCourse(id).subscribe(
        x => {
          console.log("show courses", x)
          this.classes = x;
        }
      );
    }
    else {
      this.route.navigateByUrl("/main/classeslist");
      console.log("nothing")
    }
  }
  */
}
