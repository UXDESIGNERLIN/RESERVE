import { Component, OnInit, Input } from '@angular/core';
import { ClassesService } from 'src/app/services/classes.service';
import { Class } from 'src/app/interfaces/class';
import { Course } from 'src/app/interfaces/course';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-createclass',
  templateUrl: './createclass.component.html',
  styleUrls: ['./createclass.component.css']
})
export class CreateclassComponent implements OnInit {
  id = +this.activateRoute.snapshot.paramMap.get("id")

  courseId: number;

  newClass: Class = {
    id: null,
    idCourse: this.courseId,
    tsIni: (+(new Date())) + 3600, 
    len: null,
    spots: null
  }
  
  
  constructor(private classesService: ClassesService,
              private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    
  }
  receiveCourseId(Eventarg) {
    this.courseId = Eventarg;
    
  }
  updateOrCreate() {
    if(this.newClass.id) {
      this.classesService.update(this.newClass.id, this.newClass).subscribe(
        x => (console.log("update",x))
      );
    }
    else {
      this.classesService.createToCourse(this.courseId, this.newClass).subscribe(
        x => console.log("create",x)
      )
    }
    
  }

/*
 createToCourse(id:number, term:Class): Observable<Class> {
    return this.apiservice.post(`${courseurl}/${id}/classes`, term);
  }
  */
}
