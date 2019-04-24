import { Component, OnInit } from '@angular/core';
import { CompanyService } from './services/company.service';
import { SessionService } from './services/session.service';
import { CourseService } from './services/course.service';
import { Company } from './interfaces/company';
import { Session } from './interfaces/session';
import { APIService } from './services/API.service';
import { AlertService } from './services/alert.service';
//import * as kkk from 'datatables.net-bs4';

//import * as tinymce from 'tinymce';
//import 'tinymce/themes/silver/theme.js';
//
////import 'tinymce/skins/content/default/content.css';
////import 'tinymce/skins/ui/oxide/content.min.css';
////import 'tinymce/skins/ui/oxide/skin.min.css';
/*
require('imports-loader?define=>false,$=jquery!datatables.net')(window, jQuery);
require('imports-loader?define=>false,$=jquery!datatables.net-bs4')(window, jQuery);
require('imports-loader?define=>false,$=jquery!datatables.net-buttons')(window, jQuery);
require('imports-loader?define=>false,$=jquery!datatables.net-buttons-bs4')(window, jQuery);
require('imports-loader?define=>false,$=jquery!datatables.net-buttons/js/buttons.flash.js')(window, jQuery);
require('imports-loader?define=>false,$=jquery!datatables.net-buttons/js/buttons.html5.js')(window, jQuery);
import 'datatables.net-bs4/css/dataTables.bootstrap4.css';
*/
declare var jQuery:any;

//declare var $: any;
//var dt = kkk( window, $ );

const fakecompany: Company = {
  id: 5,
  password: "lalala",
  name: "chialing",
  email: "ling@gmail.com"
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private companyService: CompanyService,
    private sessionService: SessionService,
    private courseService: CourseService,
    private alertService: AlertService
  ) {}

  ngOnInit(){
    
    /*
    jQuery('.DataTable').DataTable({
      "iDisplayLength": 50,
      dom: 'lBfrtip', // https://datatables.net/reference/option/dom
      buttons: ['copy', 'excel', 'pdf', 'csv']
      //buttons: ['copyHtml5', 'excelHtml5', 'pdfHtml5', 'csvHtml5']
    });
    */
    
    /*
    tinymce.init({
      selector: 'textarea',  // change this value according to your HTML
      plugin: 'a_tinymce_plugin',
      a_plugin_option: true,
      a_configuration_option: 400
    });
    */

    //this.alertService.test();
    /*
    this.sessionService.login("ling@gmail.com", "lalala").subscribe(
      (r)=>{
        console.log(r)
        //this.sessionService.getSession().subscribe(after=>console.log(after))
      }
    );
*/
    //this.sessionService.getSession().subscribe(before => {
    //  console.log(before);
    //});
    //this.courseService.getAll().subscribe(x=>console.log("course", x));
    //this.companyService.signup(fakecompany).subscribe(x=>console.log(x));
  }

  test(x: any) {
    console.log('DblClick', x);
  }
  
  loading() {
    return APIService.pending > 0;
  }

}
