import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { CompanyService } from 'src/app/services/company.service';
import { map } from 'rxjs/operators';
import { TrackingService } from 'src/app/services/tracking.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  templateUrl: 'main.template.html',
})
export class MainComponent implements OnInit {
  
  private username$;

  constructor (
    private companyService: CompanyService,
    private trackingService: TrackingService,
    private alertService: AlertService
  ) {}
  
  ngOnInit(): void {
    this.username$ = this.companyService.getSelf().pipe(
      map((company) => company.name),
    );

    /*
    this.trackingService.getPendingRollCall().subscribe((pending: number[]) => {
      if (pending.length > 0) {
        this.alertService.confirm(`You've got to roll call`, `You've ${pending.length} schedules pending to be roll called. Do so as promptly as possible in order to gain better system feedback.`, 'Start', 'Later').then((v) => {
          if (v) {
            // redirect bla bla bla
          }
          else {
            // esperar d'alguna manera
          }
        });
      }
    });
    */
  }
}