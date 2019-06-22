import { Component, OnInit, ViewChild } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';
import { ActivatedRoute } from '@angular/router';
import { Reservation } from 'src/app/interfaces/reservation';
import { ClassesService } from 'src/app/services/classes.service';
import { DatatableComponent } from 'src/app/components/datatable/datatable.component';
import { forkJoin } from 'rxjs';

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

  invisible = [0,1,2,3,4,5];
  
  columns = {
    email: {i: 1, show: false},
    fname: {i: 0, show: false},
    phone: {i: 2, show: false},
    age: {i: 3, show: false},
    gender: {i: 4, show: false},
    confirm: {i: 5, show: false},
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
              private classService: ClassesService) { }

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
        this._classTime = parseDate(new Date(classInfo.tsIni*1000));
        (<any>classInfo).reqInfo.forEach((req) => {
          //this.reqInfoShow[req] = true;
          this.columns[req].show = true;
        });
        this.columns.confirm.show = classInfo.confirmationSent;
        this.invisible = Object.values(this.columns).filter(c => !c.show).map(c => c.i);

        this.exportOptions.title = `MySpotBook\r\n${this._className} - ${this._classTime}`;
        this.exportOptions.filename = `Spots ${this._className}`;
        //this.datatable.destroy();
        if (this.reservationUsers.length > 0)
          setTimeout(() => { this.datatable.load(); }, 0);
    });
  }

  deleteReserve(id: string) {
    this.reservationServices.delete(id).subscribe(
      (x) => {
        console.log("this user is deleted", x);
      }
    );
  }

  updateConfirmationStatus (reservationId: string, status: string) {
    this.reservationServices.updateConfirmation(reservationId, status).subscribe();
    // Will need to handle datatable update or rerender.
  }
  
}




