import { Component, OnInit } from '@angular/core';
import { ClassesService } from 'src/app/services/classes.service';
import { Class } from 'src/app/interfaces/class';

@Component({
  templateUrl: './classeslist.component.html',
  styleUrls: ['./classeslist.component.css']
})
export class ClasseslistComponent implements OnInit {
  courseId: number;
  classes: Class[] =[];
  constructor(private classService: ClassesService) { }

  ngOnInit() {
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
}
