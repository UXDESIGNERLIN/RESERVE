import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private sessionService: SessionService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getSession();
  }

  login(email: string, password: string): void {
    this.sessionService.login(email, password).subscribe((session) => {
      if (session.loggedIn) {
        if (this.sessionService.redirectUrl == null) {
          this.router.navigateByUrl("/main");
        }
        else {
          this.router.navigateByUrl(this.sessionService.redirectUrl);
        }
      }
    });
  }

  getSession(): void {
    this.sessionService.getSession().subscribe((session) => {
      if (session.loggedIn) {
        this.router.navigateByUrl("/main");
      }
    });
  }

}
