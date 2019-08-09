import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { CompanyService } from 'src/app/services/company.service';
import { CourseService } from 'src/app/services/course.service';
import { ClassesService } from 'src/app/services/classes.service';
import { forkJoin } from 'rxjs';

@Component({
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  private _resourceType: string = this._route.snapshot.paramMap.get("by");
  private _resourceId: string = this._route.snapshot.paramMap.get("id");

  private _statistics: {};
  private _extra: {};

  constructor(
    private _route: ActivatedRoute,
    private _alertService: AlertService,
    private _companyService: CompanyService,
    private _courseService: CourseService,
    private _classService: ClassesService,
    private _router: Router
  ) { }

  ngOnInit() {
    if (this._resourceType == 'company') {
      this._companyService.GetStatistics().subscribe(
        (statistics) => {
          this._statistics = statistics;
        }
      );
    }
    else if (this._resourceType == 'event') {
      forkJoin(
        this._courseService.GetStatistics(this._resourceId),
        this._courseService.getById(this._resourceId),
      )
      .subscribe(
        ([statistics, courseInfo]) => {
          this._statistics = statistics;
          this._extra = courseInfo;
        }
      );
    }
    else if (this._resourceType == 'schedule') {
      forkJoin(
        this._classService.GetStatistics(this._resourceId),
        this._classService.getById(this._resourceId)
      ).subscribe(
        ([statistics, classInfo]) => {
          this._statistics = statistics;
          this._extra = classInfo;
        }
      );
    }
    else {
      this._alertService.error('Unknown');
    }
  }

  toEventsList() {
    this._router.navigateByUrl(`/main/events-list`);
  }

  toSchedulesList() {
    if (this._resourceType == 'event') this._router.navigateByUrl(`/main/schedules-list/${this._resourceId}`);
    else this._router.navigateByUrl(`/main/schedules-list`);
  }

  toUsers() {
    this._router.navigateByUrl(`/main/spotbook/${this._resourceId}`);
  }

}
