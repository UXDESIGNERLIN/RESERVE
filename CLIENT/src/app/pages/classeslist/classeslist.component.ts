import { Component, OnInit } from '@angular/core';
import { ClassesService } from 'src/app/services/classes.service';
import { Class } from 'src/app/interfaces/class';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './classeslist.component.html',
  styleUrls: ['./classeslist.component.css']
})
export class ClasseslistComponent implements OnInit {
  courseId: number;
  classes: Class[] =[];
  constructor(private classService: ClassesService,
              private activateRoute: ActivatedRoute,
              private route: Router) { }

  ngOnInit() {
    this.ShowCertainCourse();
  }
  getAll() {
    this.classService.getFromCourse(this.courseId).subscribe(
      x => {
        this.classes = x;
        console.log(x, this.classes);
      }
    )
    
  }
  receiveCourseId(Eventarg) {    
    this.courseId = Eventarg;
    this.getAll();
  }
  ShowCertainCourse() {
    const id = +this.activateRoute.snapshot.paramMap.get("id");
    if(id) {
      this.classService.getFromCourse(id).subscribe(
        x=> {
          console.log("show courses",x)
          this.classes = x;
        }
      );
    }
    else {
      this.route.navigateByUrl("/main/classeslist");
      console.log("nothing")
    }
  }
}
