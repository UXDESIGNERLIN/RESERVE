import { Component, OnInit } from '@angular/core';
import { APIService } from './services/API.service';
import { correctHeight, detectBody } from './app.helpers';
import { Router, NavigationEnd } from '@angular/router';

declare var jQuery:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    router: Router,
  ) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        correctHeight();
        detectBody();
      }
    });
  }

  ngOnInit(){}
  
  loading() {
    return APIService.pending > 0;
  }

  ngAfterViewInit() {
    jQuery(window).bind("load resize", function() {
      correctHeight();
      detectBody();
    });
        
    // Correct height of wrapper after metisMenu animation.
    jQuery('.metismenu a').click(() => {
      setTimeout(() => {
        correctHeight();
      }, 300)
    });
  }

}
