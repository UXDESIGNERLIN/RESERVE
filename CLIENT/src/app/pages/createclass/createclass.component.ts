import { Component, OnInit, Input } from '@angular/core';
import { ClassesService } from 'src/app/services/classes.service';
import { Class } from 'src/app/interfaces/class';
import { Course } from 'src/app/interfaces/course';


@Component({
  selector: 'app-createclass',
  templateUrl: './createclass.component.html',
  styleUrls: ['./createclass.component.css']
})
export class CreateclassComponent implements OnInit {
  courseId: number;

  newClass: Class = {
    id: null,
    idCourse: this.courseId,
    tsIni: (+(new Date())) + 3600, 
    len: null,
    spots: null
  }
  
  
  constructor(private classesService: ClassesService) { }

  ngOnInit() {
    
  }
  receiveCourseId(Eventarg) {
    this.courseId = Eventarg;
    
  }
  updateOrCreate() {
    this.classesService.createToCourse(this.courseId, this.newClass).subscribe(
      x => console.log(x)
    )
    console.log(this.newClass);
  }

/*
 createToCourse(id:number, term:Class): Observable<Class> {
    return this.apiservice.post(`${courseurl}/${id}/classes`, term);
  }
  */
}
