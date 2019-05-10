import { Component, OnInit } from '@angular/core';
import { ClassesService } from 'src/app/services/classes.service';

@Component({
  selector: 'app-contact-users',
  templateUrl: './contact-users.component.html',
  styleUrls: ['./contact-users.component.css']
})
export class ContactUsersComponent implements OnInit {

  subject: string;
  msgBody: string;
  classId: number = 19;
  constructor(private classesService: ClassesService) { }

  ngOnInit() {
  }

  send() {
    this.classesService.engage(this.classId, this.subject, this.msgBody).subscribe();
  }

}

/*
 engage(id:number, subject:string, msgbody:string): Observable<void> {
    return this.apiservice.post<void>(`${classurl}/${id}/engage`, {subject, msgbody});
  }
*/