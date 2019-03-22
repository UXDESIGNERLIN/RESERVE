import { Component, OnInit } from '@angular/core';
import { ClassesService } from 'src/app/services/classes.service';
import { Class } from 'src/app/interfaces/class';

@Component({
  selector: 'app-createclass',
  templateUrl: './createclass.component.html',
  styleUrls: ['./createclass.component.css']
})
export class CreateclassComponent implements OnInit {
  
  constructor(private classesService: ClassesService) { }

  ngOnInit() {
  }

/*
 createToCourse(id:number, term:Class): Observable<Class> {
    return this.apiservice.post(`${courseurl}/${id}/classes`, term);
  }
  */
}
