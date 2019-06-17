import { Component, OnInit, Input } from '@angular/core';
import { ClassesService } from 'src/app/services/classes.service';
import { Class } from 'src/app/interfaces/class';
import { Course } from 'src/app/interfaces/course';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-createclass',
  templateUrl: './createclass.component.html',
  styleUrls: ['./createclass.component.css']
})
export class CreateclassComponent implements OnInit {
  //classId = this.activateRoute.snapshot.paramMap.get("classid");
  
  creating: boolean = true;

  //courseId: string = this.activateRoute.snapshot.paramMap.get("courseid");

  newClass: Class = {
    id: this.activateRoute.snapshot.paramMap.get("classid"),
    courseId: this.activateRoute.snapshot.paramMap.get("courseid"),
    tsIni: ((+new Date()/1000)|0)  + 3600, 
    len: 3600,
    spots: null,
  }
  
  constructor(private classesService: ClassesService,
              private activateRoute: ActivatedRoute,
              private route: Router) { }

  ngOnInit() {
    this.classDetail();
  }

  classDetail() {
    if(this.newClass.id) {
      this.creating = false;
      this.classesService.getById(this.newClass.id).subscribe(
        x => {
          this.newClass = x;
         // this.courseId = x.courseId;
        }
      )
     
    }
  }


  receiveCourseId(Eventarg) {
    this.newClass.courseId = Eventarg;
    this.route.navigateByUrl(`/main/createclass/${this.newClass.courseId}`);
  }

  updateOrCreate() {
    let upsert;
    if(this.newClass.id) {
      upsert = this.classesService.update(this.newClass.id, this.newClass);
    }
    else {
      upsert = this.classesService.createToCourse(this.newClass.courseId, this.newClass);
    }
    upsert.subscribe(
      x => {
        this.route.navigateByUrl(`/main/classeslist/${this.newClass.courseId}`);
      }
    )
  }
 

}
