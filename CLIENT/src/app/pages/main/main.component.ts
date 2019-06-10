import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { CompanyService } from 'src/app/services/company.service';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: 'main.template.html',
})
export class MainComponent implements OnInit {
  
  private username$;

  constructor (
    private companyService: CompanyService
  ) {}
  
  ngOnInit(): void {
    this.username$ = this.companyService.getSelf(+'JiaLing why getSelf needs id?').pipe(
      map((company) => company.name),
    );
  }
}