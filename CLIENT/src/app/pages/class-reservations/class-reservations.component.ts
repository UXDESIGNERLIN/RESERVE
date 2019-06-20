import { Component, OnInit, ViewChild } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';
import { ActivatedRoute } from '@angular/router';
import { Reservation } from 'src/app/interfaces/reservation';
import { ClassesService } from 'src/app/services/classes.service';
import { DatatableComponent } from 'src/app/components/datatable/datatable.component';
import { forkJoin } from 'rxjs';

function parseDate(d: Date) {
  return `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
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

  confirmationSection: boolean

  reservationUsers: Reservation[];
  
  reqInfoShow = {
    email: false,
    fname: false,
    phone: false,
    age: false,
    gender: false
  }

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
        (<any>classInfo).reqInfo.forEach((req) => {
          this.reqInfoShow[req] = true;
        });
        this.exportOptions.title = `MySpotBook\r\n${(<any>classInfo).name} - ${parseDate(new Date(classInfo.tsIni*1000))}`;
        this.exportOptions.filename = `Spots ${(<any>classInfo).name}`;
        //this.datatable.destroy();
        setTimeout(() => this.datatable.load(), 0);
    });
  }

  deleteReserve(id: string) {
    this.reservationServices.delete(id).subscribe(
      (x) => {
        this. confirmationSection = false; // In future we might change here 
        console.log("this user is deleted", x);
      }
    );
  }
  
}




