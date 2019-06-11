import { Component, OnInit } from '@angular/core';
import { Session } from 'src/app/interfaces/session';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { CanActivate } from '@angular/router/src/utils/preactivation';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private sessionService: SessionService,
    private router: Router,
    private authGuard: AuthGuard) { }

  ngOnInit() {
    this.getSession();

  }

  login(email: string, password: string): void {
    this.sessionService.login(email, password).subscribe(
      x => {
        console.log("FIRST ATTEMPT: LOG IN", x.loggedIn);
        if (x.loggedIn) {
          this.router.navigateByUrl("/main");//if the user is logged in, direct user to "./main"
          //this.router.navigateByUrl(this.authGuard.url);
        }
      }
    )
  }

  getSession(): void {
    this.sessionService.getSession().subscribe(
      x => {
        if (x.loggedIn) {
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
