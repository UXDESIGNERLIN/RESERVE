import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';
import { ActivatedRoute } from '@angular/router';
import { Reservation } from 'src/app/interfaces/reservation';

@Component({
  selector: 'app-class-reservations',
  templateUrl: './class-reservations.component.html',
  styleUrls: ['./class-reservations.component.css']
})
export class ClassReservationsComponent implements OnInit {

  classId: string = this.route.snapshot.paramMap.get("id");
  reservationUsers: Reservation[];
  constructor(private reservationServices: ReservationService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getAllById();
  }

  getAllById() {
    this.reservationServices.getFromClass(this.classId).subscribe(
      (reservations) => {
        this.reservationUsers = reservations;
        console.log("Reservation", this.reservationUsers);
      }
    );
  }

}
