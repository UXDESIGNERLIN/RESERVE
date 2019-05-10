import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { CompanyService } from 'src/app/services/company.service';
import { CourseService } from 'src/app/services/course.service';
import { ClassesService } from 'src/app/services/classes.service';
import { stat } from 'fs';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-statistics',
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
    private _classService: ClassesService
  ) { }

  ngOnInit() {
    if (this._resourceType == 'company') {
      this._companyService.GetStatistics().subscribe(
        (statistics) => {
          this._statistics = statistics;
        }
      );
    }
    else if (this._resourceType == 'course') {
      forkJoin(
        this._courseService.GetStatistics(+this._resourceId),
        this._courseService.getById(+this._resourceId),
      )
      .subscribe(
        ([statistics, courseInfo]) => {
          this._statistics = statistics;
          this._extra = courseInfo;
        }
      );
    }
    else if (this._resourceType == 'class') {
      forkJoin(
        this._classService.GetStatistics(+this._resourceId),
        this._classService.getById(+this._resourceId)
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

}
