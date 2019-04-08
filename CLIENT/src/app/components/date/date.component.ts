import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {
  start: string;
  finish: number = 3600;
  constructor() { }

  ngOnInit() {
  }
  submitDate() {
    
    console.log(this.convertStringToTs(this.start), this.finish, "duration");
  }

  convertStringToTs(value: string) {
    return (+(new Date(value))/1000)|0;
  }
}
