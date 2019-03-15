import { Component, OnInit } from '@angular/core';
import { Session } from 'src/app/interfaces/session';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private sessionService: SessionService,
              private router: Router) { }

  ngOnInit() {
    this.getSession();
  }

  login(email:string, password: string): void {
    console.log("x");
    this.sessionService.login(email, password).subscribe(
      x => {
        if (x.loggedIn) {
          this.router.navigateByUrl("/main");//if the user is logged in, direct user to "./main" 
        } 
      }
    )
  }

  getSession(): void {
    this.sessionService.getSession().subscribe(
      x => {
        if(x.loggedIn) {
          this.router.navigateByUrl("/main");
        }
      }
    )
  }


  /* getSession():Observable<Session> {
    return this.apiservice.get(sessionurl);
  }
  */
  
  /*
  login(email:string, password: string):Observable<Session> {
    return this.apiservice.post(sessionurl, {password, email});
  }
  */

}
