import { Component, OnInit, Input } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { Session } from 'src/app/interfaces/session';
import { Company } from 'src/app/interfaces/company';
import { Router } from '@angular/router';

let session: Session;


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  @Input() company:Company;
  constructor(private sessionService: SessionService,
              private router: Router) { }

  ngOnInit() {
    this.sessionService.logout().subscribe(
      x => {
        this.router.navigateByUrl('/login');
      }
    );
  }
  
  
  

}
