import { Component, OnInit, Input } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private sessionService: SessionService,
              private router: Router) { }

  ngOnInit() {
    this.sessionService.logout().subscribe(() => {
      this.router.navigateByUrl('/login');
    });
  }

}
