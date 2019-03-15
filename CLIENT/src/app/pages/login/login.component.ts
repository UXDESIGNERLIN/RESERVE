import { Component, OnInit } from '@angular/core';
import { Session } from 'src/app/interfaces/session';
import { SessionService } from 'src/app/services/session.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private sessionService: SessionService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
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
  
  /*
  login(email:string, password: string):Observable<Session> {
    return this.apiservice.post(sessionurl, {password, email});
  }
  */

}
