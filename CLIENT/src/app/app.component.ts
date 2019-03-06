import { Component, OnInit } from '@angular/core';
import { CompanyService } from './company.service';
import { SessionService } from './session.service';
import { CourseService } from './course.service';
import { Company } from './company';
import { Session } from './session';

const fakecompany: Company = {
  id: 5,
  password: "lalala",
  name: "chialing",
  email: "ling@gmail.com"
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private companyService: CompanyService,
    private sessionService: SessionService,
    private courseService: CourseService
  ) {}

  ngOnInit(){
    this.sessionService.getSession().subscribe(before => {
      console.log(before);
      this.sessionService.login("ling@gmail.com", "lalala").subscribe(
        ()=>{
          this.sessionService.getSession().subscribe(after=>console.log(after))
        }
      );
    });
    //this.courseService.getAll().subscribe(x=>console.log("course", x));
    //this.companyService.signup(fakecompany).subscribe(x=>console.log(x));
  }
  
  
  
}
