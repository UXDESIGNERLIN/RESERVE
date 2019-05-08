import { Component, OnInit, ViewChild } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';
import { ActivatedRoute } from '@angular/router';
import { Reservation } from 'src/app/interfaces/reservation';
import { ClassesService } from 'src/app/services/classes.service';
import { DatatableComponent } from 'src/app/components/datatable/datatable.component';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-class-reservations',
  templateUrl: './class-reservations.component.html',
  styleUrls: ['./class-reservations.component.css']
})
export class ClassReservationsComponent implements OnInit {
  @ViewChild(DatatableComponent) datatable: DatatableComponent;

  classId: string = this.route.snapshot.paramMap.get("id");
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
    let observableClass = this.classService.getById(+this.classId);
    forkJoin(observableReserves, observableClass)
    .subscribe(
      ([reservations, classInfo]) => {
        this.reservationUsers = reservations;
        (<any>classInfo).reqInfo.forEach(
          (req) => {
            this.reqInfoShow[req] = true;
        });
        //this.datatable.destroy();
        setTimeout(() => this.datatable.load(), 0);
    });
  }

  deleteReserve(id: number) {
    this.reservationServices.delete(id).subscribe(
      (x) => {
        console.log("this user is deleted", x);
      }
    );
  }
  
}




