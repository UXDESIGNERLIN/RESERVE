import { Component, OnInit, Output, EventEmitter, Input  } from '@angular/core';
import { CourseTypesService } from 'src/app/services/course-types.service';
import { courseTypes } from 'src/app/interfaces/courseTypes';

@Component({
  selector: 'app-select-course-type',
  templateUrl: './select-course-type.component.html',
  styleUrls: ['./select-course-type.component.css']
})
export class SelectCourseTypeComponent implements OnInit {
  @Input() selectedCourseType: number = null;
  @Output() selectEvent = new EventEmitter<number>();
  @Input() disabledOrnot: boolean = false;
  courseTypes: courseTypes[];
  courseTest: number = 50;
  constructor(private courseTypesService: CourseTypesService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    console.log("from beginning", this.selectedCourseType);
    this.courseTypesService.getAll().subscribe(
      (type) => {
        this.courseTypes = type;
        console.log(type);
      }
    );
  }

  sendSelected() {
   this.selectEvent.emit(this.selectedCourseType);
    console.log("KID", this.selectedCourseType);
   
  }
}
