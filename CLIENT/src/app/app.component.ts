import { Component, OnInit } from '@angular/core';
import { CompanyService } from './services/company.service';
import { SessionService } from './services/session.service';
import { CourseService } from './services/course.service';
import { Company } from './interfaces/company';
import { Session } from './interfaces/session';
import { APIService } from './services/API.service';

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
    private courseService: CourseService,
  ) {}

  ngOnInit(){
    /*
    this.sessionService.login("ling@gmail.com", "lalala").subscribe(
      (r)=>{
        console.log(r)
        //this.sessionService.getSession().subscribe(after=>console.log(after))
      }
    );
*/
    //this.sessionService.getSession().subscribe(before => {
    //  console.log(before);
    //});
    //this.courseService.getAll().subscribe(x=>console.log("course", x));
    //this.companyService.signup(fakecompany).subscribe(x=>console.log(x));
  }
  
  loading() {
    return APIService.pending > 0;
  }

}
