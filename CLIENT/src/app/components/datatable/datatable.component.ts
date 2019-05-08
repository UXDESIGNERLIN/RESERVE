import { Component, OnInit, ViewChild, ViewContainerRef, Input, Output, EventEmitter, AfterViewInit, ContentChildren, QueryList, AfterContentInit, AfterContentChecked, ElementRef, ChangeDetectorRef } from '@angular/core';

require('imports-loader?define=>false,$=jquery!datatables.net')(window, jQuery);
require('imports-loader?define=>false,$=jquery!datatables.net-bs4')(window, jQuery);
require('imports-loader?define=>false,$=jquery!datatables.net-buttons')(window, jQuery);
require('imports-loader?define=>false,$=jquery!datatables.net-buttons-bs4')(window, jQuery);
require('imports-loader?define=>false,$=jquery!datatables.net-buttons/js/buttons.flash.js')(window, jQuery);
require('imports-loader?define=>false,$=jquery!datatables.net-buttons/js/buttons.html5.js')(window, jQuery);
import 'datatables.net-bs4/css/dataTables.bootstrap4.css';
import { Subject } from 'rxjs';

declare var jQuery:any;

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.template.html',
  styleUrls: ['./datatable.style.css']
})
export class DatatableComponent implements AfterViewInit { //AfterContentInit, AfterContentChecked {    
  //@ViewChild("datatable") contentWrapper: ElementRef;
  private _content = "";

  //ngAfterContentInit(): void {
  //    this._content = this.table.element.nativeElement.innerHTML;
  //    this.updateTable();
  //}
  //
  //ngAfterContentChecked(): void {
  //    const c = this.table.element.nativeElement.innerHTML;
  //    if (c !== this._content) {
  //      this._content = c;
  //      this.updateTable();
  //    }
  //}
  
  @ViewChild('datatable', {read: ViewContainerRef}) table;
  @Input() displayLength = 50;
  @Input() invisible = [];
  @Input() unsearchable = [];
  @Input() export = true;
  @Input() selectable = false;
  @Input() autoload = true;

  @Output() onDblClick = new EventEmitter<any>();

  private _datatable: any;

  constructor(
    private chRef: ChangeDetectorRef
  ) {}

  //updateTable () {
  //  if (this._datatable == null) this._loadTable();
  //  else {
  //    //this.chRef.detectChanges();
  //    //this._loadTable(true);
  //    //this._datatable.rows().invalidate();//.draw();
  //  }
  //  console.log(this._datatable);
  //}

  ngAfterViewInit() {
    if (this.autoload) this.load();
  }

  load () {
    this._datatable = jQuery(this.table.element.nativeElement).DataTable({
      //destroy: true, //(this._datatable != null),
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

  destroy () {
    if (this._datatable)
      this._datatable.destroy();
  }

  cleanSelection() {
    this._datatable.$('tr.selected').removeClass('selected');
  }
}
