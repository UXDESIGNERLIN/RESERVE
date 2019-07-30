import { Component, OnInit, ViewChild } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';
import { ActivatedRoute } from '@angular/router';
import { Reservation } from 'src/app/interfaces/reservation';
import { ClassesService } from 'src/app/services/classes.service';
import { DatatableComponent } from 'src/app/components/datatable/datatable.component';
import { forkJoin } from 'rxjs';
import { DatePipe } from '@angular/common';
import { AlertService } from 'src/app/services/alert.service';

function tz(s: string | number) {
  return ('00'+s).substr(-2);
}

function parseDate(d: Date) {
  return `${tz(d.getDate())}/${tz(d.getMonth()+1)}/${d.getFullYear()} ${tz(d.getHours())}:${tz(d.getMinutes())}`;
}

@Component({
  templateUrl: './class-reservations.component.html',
  styleUrls: ['./class-reservations.component.css']
})
export class ClassReservationsComponent implements OnInit {
  @ViewChild(DatatableComponent) datatable: DatatableComponent;

  exportOptions = {
    title: 'SpotBook', 
    filename: 'SpotBook', 
    messageTop: '', 
    messageBottom: `List generated on ${new Date()}`
  }

  classId: string = this.route.snapshot.paramMap.get("id");
  
  private _className: string;
  private _classTime: string;

  confirmationSection: boolean

  reservationUsers: Reservation[] = [];

  invisible = [0,1,2,3,4,5,6];
  
  columns = {
    email: {i: 1, show: false},
    fname: {i: 0, show: false},
    phone: {i: 2, show: false},
    age: {i: 3, show: false},
    gender: {i: 4, show: false},
    confirm: {i: 5, show: false},
    rollcall: {i: 6, show: true},
  }

  /*
  reqInfoShow = {
    email: false,
    fname: false,
    phone: false,
    age: false,
    gender: false
  }
  */

  constructor(private reservationServices: ReservationService,
              private route: ActivatedRoute,
              private classService: ClassesService,
              private alertService: AlertService) { }

  ngOnInit() {
    this.loadDatatable();
  }

  loadDatatable () {
    let observableReserves = this.reservationServices.getFromClass(this.classId);
    let observableClass = this.classService.getById(this.classId);
    forkJoin(observableReserves, observableClass)
    .subscribe(
      ([reservations, classInfo]) => {
        this.confirmationSection = classInfo.confirmationSent;
        this.reservationUsers = reservations;
        this._className = (<any>classInfo).name;
        this._classTime = ''+classInfo.tsIni; // parseDate(new Date(classInfo.tsIni*1000));
        (<any>classInfo).reqInfo.forEach((req) => {
          //this.reqInfoShow[req] = true;
          this.columns[req].show = true;
        });
        this.columns.confirm.show = classInfo.confirmationSent;
        this.invisible = Object.values(this.columns).filter(c => !c.show).map(c => c.i);

        this.exportOptions.title = `MySpotBook\r\n${this._className} - ${this._classTime}`;
        this.exportOptions.filename = `Spots ${this._className}`;

        if (this.reservationUsers.length > 0)
          setTimeout(() => { 
            this.datatable.load(); 
            this.datatable.registerPdfExportCustomize((pdfdoc, btnconf, dtapi) => {

              let title = `MySpotBook.com`;
              let course = this._className;
              let tsIni = 'Scheduled for '+(new DatePipe('en')).transform(+this._classTime*1000, 'MMM d, y, HH:mm');

              Object.assign(pdfdoc.content[0], {
                // TODO :: overtwrite style and text
                columns: [
                  {
                    width: 'auto',
                    text: title,
                    style: 'brand'
                  },
                  {
                    width: '*',
                    stack: [
                      {
                        text: course,
                        style: 'coursename'
                      },
                      {
                        text: tsIni,
                        style: 'classtime'
                      }
                    ],
                  },
                ]
              });

              // Style title
              pdfdoc.styles.brand = { alignment: 'left', fontSize: 16 };
              pdfdoc.styles.coursename = { alignment: 'right', fontSize: 12 };
              pdfdoc.styles.classtime = { alignment: 'right', fontSize: 10 };

              // If we are showing confirmationSection, take out the "Edit" from it, on the pdf export.
              if (this.confirmationSection) {
                let ci = pdfdoc.content[1].table.body[0].length-2;
                for (let i = 1; i < pdfdoc.content[1].table.body.length; ++i) {
                  let confirm = pdfdoc.content[1].table.body[i][ci].text;
                  pdfdoc.content[1].table.body[i][ci].text = confirm.substr(0, confirm.indexOf('Edit'));
                }
              }

              // Style table so no row has a white background.
              pdfdoc.styles.tableBodyEven.fillColor = '#e7e7e7';

              //console.log(pdfdoc,dtapi);
            });
          }, 0);
    });
  }

  deleteReserve(id: string) {
    this.alertService.confirm('Confirm this action', 'Please confirm that you want to delete this reservation').then((confirm) => {
      if (confirm) {
        this.reservationServices.delete(id).subscribe(
          (x) => {
            console.log("this user is deleted", x);
          }
        );
      }
    })
  }

  updateConfirmationStatus (reservationId: string, status: string) {
    this.reservationServices.updateConfirmation(reservationId, status).subscribe();
    // Will need to handle datatable update or rerender.
  }

  updateReservationStatus (reservationId: string, status: string) {
    this.reservationServices.updateStatus(reservationId, status).subscribe();
    // Will need to handle datatable update or rerender.
  }
  
}




