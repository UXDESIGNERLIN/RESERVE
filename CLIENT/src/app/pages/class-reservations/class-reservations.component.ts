import { Component, OnInit, ViewChild } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';
import { ActivatedRoute } from '@angular/router';
import { Reservation } from 'src/app/interfaces/reservation';
import { ClassesService } from 'src/app/services/classes.service';
import { DatatableComponent } from 'src/app/components/datatable/datatable.component';
import { forkJoin } from 'rxjs';
import { DatePipe } from '@angular/common';
import { AlertService } from 'src/app/services/alert.service';
import { Class } from 'src/app/interfaces/class';

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

  // Export options passed to datatable component
  exportOptions = {
    title: 'MySpotBook.com', 
    filename: '', 
    messageTop: '', 
    messageBottom: `List generated on ${new Date()}`
  }


  classId: string = this.route.snapshot.paramMap.get("id");

  private _classInfo: any;

  reservationUsers: Reservation[] = [];

  invisible = [0,1,2,3,4,5,6,7,8];
  
  columns = {
    email: {i: 1, show: false, export: true},
    fname: {i: 0, show: false, export: true},
    phone: {i: 2, show: false, export: true},
    age: {i: 3, show: false, export: true},
    gender: {i: 4, show: false, export: true},
    history: {i: 5, show: false, export: false},
    confirm: {i: 6, show: false, export: false},
    rollcall: {i: 7, show: false, export: false},
    options: {i: 8, show: false, export: false},
  }

  private _search: string = '';

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
        this.reservationUsers = reservations.map(r => {
          return { ...r, history: this.reservationServices.getHistoricData(r.id) };
        });
        this._classInfo = classInfo;
        this._classInfo.reqInfo.forEach((req) => {
          this.columns[req].show = true;
        });
        let classStarted = this._classStarted(classInfo);

        this.columns.confirm.show = classInfo.confirmationSent && !classStarted;
        this.columns.rollcall.show = classStarted;
        this.columns.options.show = !classStarted;
        this.columns.history.show = !classStarted;
        this.invisible = Object.values(this.columns).filter(c => !c.show).map(c => c.i);

        this.exportOptions.filename = `Spots ${this._classInfo.name}`;

        if (this.reservationUsers.length > 0)
          setTimeout(() => {
            this.datatable.load();
            this.datatable.registerPdfExportCustomize((pdfdoc, btnconf, dtapi) => {

              Object.assign(pdfdoc.content[0], {
                // TODO :: overtwrite style and text
                columns: [
                  {
                    svg: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" viewBox="0 0 300 300" width="300" height="300"><defs><path d="M266.56 259.98C256.49 261.66 250.19 262.71 247.66 263.13C180.87 274.27 112.69 274.27 45.9 263.13C42.11 262.5 66.07 266.49 45.9 263.13C35 261.31 27 251.88 27 240.83C27 200.74 27 98.63 27 58.29C27 47.97 34.47 39.14 44.66 37.45C65.08 34.04 41.13 38.04 44.66 37.45C112.27 26.18 181.29 26.18 248.9 37.45C251.26 37.84 257.14 38.82 266.56 40.39" id="clEdh9Za3"></path><path d="M266.56 259.98C256.49 261.66 250.19 262.71 247.66 263.13C180.87 274.27 66.07 266.49 45.9 263.13C35 261.31 27 251.88 27 240.83C27 200.74 27 98.63 27 58.29C27 47.97 34.47 39.14 44.66 37.45C65.08 34.04 181.29 26.18 248.9 37.45C251.26 37.84 257.14 38.82 266.56 40.39" id="j1oB3tXPA3"></path><path d="M242.05 95.25C242.05 84.2 251.01 75.24 262.06 75.24C273.11 75.24 282.08 84.2 282.08 95.25C282.08 106.3 273.11 115.26 262.06 115.26C251.01 115.26 242.05 106.3 242.05 95.25Z" id="aECoT1WqP"></path><path d="M242.05 95.25C242.05 84.2 251.01 75.24 262.06 75.24C273.11 75.24 282.08 84.2 282.08 95.25C282.08 106.3 273.11 115.26 262.06 115.26C251.01 115.26 242.05 106.3 242.05 95.25Z" id="e43GsPGgxA"></path><path d="M244 150C244 136.2 255.2 125 269 125C282.81 125 294 136.2 294 150C294 163.79 282.81 175 269 175C255.2 175 244 163.79 244 150Z" id="dyN8I7Mmv"></path><path d="M244 150C244 136.2 255.2 125 269 125C282.81 125 294 136.2 294 150C294 163.79 282.81 175 269 175C255.2 175 244 163.79 244 150Z" id="a5AGOmMExn"></path><path d="M242.05 202.99C242.05 191.94 251.01 182.96 262.06 182.96C273.11 182.96 282.08 191.94 282.08 202.99C282.08 214.02 273.11 223 262.06 223C251.01 223 242.05 214.02 242.05 202.99Z" id="g4pMDXHvfP"></path><path d="M242.05 202.99C242.05 191.94 251.01 182.96 262.06 182.96C273.11 182.96 282.08 191.94 282.08 202.99C282.08 214.02 273.11 223 262.06 223C251.01 223 242.05 214.02 242.05 202.99Z" id="c806CGG09"></path></defs><g><g><g><use xlink:href="#clEdh9Za3" opacity="1" fill="#000000" fill-opacity="0"></use><g><use xlink:href="#clEdh9Za3" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="1" stroke-opacity="0"></use></g></g><g><use xlink:href="#j1oB3tXPA3" opacity="1" fill="#000000" fill-opacity="0"></use><g><use xlink:href="#j1oB3tXPA3" opacity="1" fill-opacity="0" stroke="#ff942f" stroke-width="42" stroke-opacity="1"></use></g></g><g><use xlink:href="#aECoT1WqP" opacity="1" fill="#ff942f" fill-opacity="1"></use><g><use xlink:href="#aECoT1WqP" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="1" stroke-opacity="0"></use></g></g><g><use xlink:href="#e43GsPGgxA" opacity="1" fill="#000000" fill-opacity="0"></use><g><use xlink:href="#e43GsPGgxA" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="1" stroke-opacity="0"></use></g></g><g><use xlink:href="#dyN8I7Mmv" opacity="1" fill="#ff942f" fill-opacity="1"></use><g><use xlink:href="#dyN8I7Mmv" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="1" stroke-opacity="0"></use></g></g><g><use xlink:href="#a5AGOmMExn" opacity="1" fill="#000000" fill-opacity="0"></use><g><use xlink:href="#a5AGOmMExn" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="1" stroke-opacity="0"></use></g></g><g><use xlink:href="#g4pMDXHvfP" opacity="1" fill="#ff942f" fill-opacity="1"></use><g><use xlink:href="#g4pMDXHvfP" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="1" stroke-opacity="0"></use></g></g><g><use xlink:href="#c806CGG09" opacity="1" fill="#000000" fill-opacity="0"></use><g><use xlink:href="#c806CGG09" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="1" stroke-opacity="0"></use></g></g></g></g></svg>`,
                    width: 40,
                  },
                  {
                    width: 'auto',
                    text: this.exportOptions.title,
                    style: 'brand'
                  },
                  {
                    width: '*',
                    stack: [
                      {
                        text: this._classInfo.name,
                        style: 'coursename'
                      },
                      {
                        text: 'Scheduled for '+(new DatePipe('en')).transform(+this._classInfo.tsIni*1000, 'MMM d, y, HH:mm'),
                        style: 'classtime'
                      }
                    ],
                  },
                ]
              });

              // Style title
              pdfdoc.styles.brand = { alignment: 'left', fontSize: 28, color: '#FF942F', bold: true };
              pdfdoc.styles.coursename = { alignment: 'right', fontSize: 12 };
              pdfdoc.styles.classtime = { alignment: 'right', fontSize: 10 };

              // Remove visible columns that we don't export
              Object.values(this.columns). // Totes les columnes
              filter(c => c.show && !c.export). // Filtrem les que volem eliminar
              map(c => c.i - this.invisible.reduce((p,curr) => { // Mapajem index
                return p + ((curr >= c.i) ? 0 : 1);
              }, 0)).  // i en treiem tantes unitats com columnes d'index més baix invisibles hi hagi.
              sort((a, b) => (b - a)). // Ordenem de gran a petit
              forEach((iToRemove) => {
                for (let i = 0; i < pdfdoc.content[1].table.body.length; ++i) {
                  pdfdoc.content[1].table.body[i].splice(iToRemove, 1);
                }
              });

              // Style table so no row has a white background.
              pdfdoc.styles.tableBodyEven.fillColor = '#e7e7e7';
            });
          }, 0);
    });
  }

  deleteReserve(id: string) {
    this.alertService.confirm('Confirm this action', 'Please confirm that you want to delete this reservation').then((confirm) => {
      if (confirm) {
        this.reservationServices.delete(id).subscribe(
          () => {
            let index_to_remove = this.reservationUsers.findIndex(r => r.id == id);
            this.reservationUsers.splice(index_to_remove, 1); // Maybe we don't need this line
            this.datatable.removeRow(index_to_remove);
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
    this.reservationServices.updateStatus(reservationId, status, this.classId, this._classInfo.courseId).subscribe();
    // Will need to handle datatable update or rerender.
  }

  private _classStarted (c: Class) {
    let now = (Date.now()/1000) | 0;
    return (c.tsIni <= now);
  }

  search (v: string) {
    this._search = v;
    this.datatable.search(this._search);
  }

  requestConfirmation () {
    this.classService.confirm(this._classInfo.id).subscribe(() => {
      this._classInfo.confirmationSent = true;
    });
  }
  
}




