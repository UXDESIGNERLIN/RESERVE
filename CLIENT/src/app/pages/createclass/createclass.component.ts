import { Component, OnInit, Input } from '@angular/core';
import { ClassesService } from 'src/app/services/classes.service';
import { Class } from 'src/app/interfaces/class';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';



@Component({
  templateUrl: './createclass.component.html',
  styleUrls: ['./createclass.component.css']
})
export class CreateclassComponent implements OnInit {
  creating: boolean = true;

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
    if (this.newClass.id) {
      this.classesService.getById(this.newClass.id).subscribe( (c) => {
        this.newClass = c;
        this.creating = false;
      });
    }
  }

  receiveCourseId(Eventarg) {
    this.newClass.courseId = Eventarg;
    this.route.navigateByUrl(`/main/createclass/${this.newClass.courseId}`);
  }

  updateOrCreate() {
    let upsert: Observable<Class>;
    if (!this.creating) {
      upsert = this.classesService.update(this.newClass.id, this.newClass);
    }
    else {
      upsert = this.classesService.createToCourse(this.newClass.courseId, this.newClass);
    }
    upsert.subscribe(() => {
      this.route.navigateByUrl(`/main/classeslist/${this.newClass.courseId}`);
    });
  }
 

}
