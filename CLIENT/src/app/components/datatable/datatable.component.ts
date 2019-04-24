import { Component, OnInit } from '@angular/core';

require('imports-loader?define=>false,$=jquery!datatables.net')(window, jQuery);
require('imports-loader?define=>false,$=jquery!datatables.net-bs4')(window, jQuery);
require('imports-loader?define=>false,$=jquery!datatables.net-buttons')(window, jQuery);
require('imports-loader?define=>false,$=jquery!datatables.net-buttons-bs4')(window, jQuery);
require('imports-loader?define=>false,$=jquery!datatables.net-buttons/js/buttons.flash.js')(window, jQuery);
require('imports-loader?define=>false,$=jquery!datatables.net-buttons/js/buttons.html5.js')(window, jQuery);
import 'datatables.net-bs4/css/dataTables.bootstrap4.css';

declare var jQuery:any;

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.template.html',
  styleUrls: ['./datatable.style.css']
})
export class DatatableComponent implements OnInit {
  
  constructor() { }

  ngOnInit() {
    jQuery('.DataTable').DataTable({
      "iDisplayLength": 50,
      dom: 'lBfrtip', // https://datatables.net/reference/option/dom
      buttons: ['copy', 'excel', 'pdf', 'csv']
      //buttons: ['copyHtml5', 'excelHtml5', 'pdfHtml5', 'csvHtml5']
    });
  }
}
