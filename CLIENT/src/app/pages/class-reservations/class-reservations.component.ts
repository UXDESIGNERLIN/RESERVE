import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';
import { ActivatedRoute } from '@angular/router';
import { Reservation } from 'src/app/interfaces/reservation';
import { CourseService } from 'src/app/services/course.service';
import { ClassesService } from 'src/app/services/classes.service';


@Component({
  selector: 'app-class-reservations',
  templateUrl: './class-reservations.component.html',
  styleUrls: ['./class-reservations.component.css']
})
export class ClassReservationsComponent implements OnInit {

  classId: string = this.route.snapshot.paramMap.get("id");
  reservationUsers: Reservation[];
  reqInfoShow = {
    email: true,
    fname: false,
    phone: false,
    age: false,
    gender: false
  }

  

  constructor(private reservationServices: ReservationService,
              private route: ActivatedRoute,
              private courseService: CourseService,
              private classService: ClassesService) { }

  ngOnInit() {
    this.showReqInfo(this.classId);
    //this.test();
    this.getAll();
  }

  getAll() {
    this.reservationServices.getFromClass(this.classId).subscribe(
      (reservations) => {
        this.reservationUsers = reservations;
      }
    );
  }

  deleteReserve(id: number) {
    this.reservationServices.delete(id).subscribe(
      (x) => {
        console.log("this user is deleted", x);
      }
    );
  }

  showReqInfo(classId) {
    this.classService.getById(classId).subscribe(
      // classInfo.reqInfo is string
      (classInfo) => {
        //classInfo.reqInfo = classInfo.reqInfo.split(",");
        classInfo.reqInfo.forEach(
          (req) => {
            for (let i = 0; i<5; i++) {
              if (req == Object.keys(this.reqInfoShow)[i]) {
                console.log("the entry of obj",Object.values(this.reqInfoShow)[i])
                Object.values(this.reqInfoShow)[i] = true;
                break;
              }
            }
            
          }
        )
        console.log("class is", classInfo.reqInfo,"show:", Object.keys(this.reqInfoShow));
        });
        
      }

  /*
  test() {
    const array = ["chialing","test","haha"];
    array.forEach(
      (x) => {
        console.log(x)
      }
    )
    console.log(array.length);
    
    var string = "hey how are you";
    string.split(' ').map(
      (x) => {
        console.log(x + "counted")
      }
    )
  */
  
    
    //console.log the reqInfo of the class
    /*this.reservationServices.getById(id).subscribe(
      (reserve) => {
        if(!reserve.fname) {
          this.fnameShow = false;
        }
        if(!reserve.phone) {
          this.phoneShow = false;
        }
        if(!reserve.age) {
          this.ageShow = false;
        }
        if(!reserve.gender) {
          this.genderShow = false;
        }
      }
    )*/
  }




