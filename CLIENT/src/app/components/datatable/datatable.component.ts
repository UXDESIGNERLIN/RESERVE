import { Component, OnInit, ViewChild, ViewContainerRef, Input, Output, EventEmitter } from '@angular/core';

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
  
  @ViewChild('datatable', {read: ViewContainerRef}) table;
  @Input() displayLength = 50;
  @Input() invisible = [];
  @Input() unsearchable = [];
  @Input() export = true;
  @Input() selectable = false;

  @Output() onDblClick = new EventEmitter<any>();

  private _datatable: any;

  constructor() { }

  ngOnInit() {
    this._datatable = jQuery(this.table.element.nativeElement).DataTable({
      "iDisplayLength": this.displayLength,
      dom: 'lBfrtip', // https://datatables.net/reference/option/dom
      buttons: (this.export) ? ['pdf'] : [], //['copy', 'excel', 'pdf', 'csv']
      columnDefs: [
        {
          targets: this.invisible,
          visible: false
        },
        {
          targets: this.unsearchable,
          searchable: false
        }
      ]
    });

    if (this.selectable) {
      jQuery(this.table.element.nativeElement).children('tbody').on( 'click', 'tr', function () {
        if ( jQuery(this).hasClass('selected') ) {
          jQuery(this).removeClass('selected');
        }
        else {
          this._datatable.$('tr.selected').removeClass('selected');
          jQuery(this).addClass('selected');
        }
      });
    }

    let self = this;

    jQuery(this.table.element.nativeElement).children('tbody').on( 'dblclick', 'tr', function () {
      self.onDblClick.emit(self._datatable.row( this ).data());
    });
  }

  cleanSelection() {
    this._datatable.$('tr.selected').removeClass('selected');
  }
}
