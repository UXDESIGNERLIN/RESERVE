import { Component, OnInit, ViewChild, ViewContainerRef, Output, Input, EventEmitter, forwardRef, NgZone, OnDestroy } from '@angular/core';

//import * as tinymce from 'tinymce';
//import 'tinymce/themes/silver/theme.js';
//
////import 'tinymce/skins/content/default/content.css';
////import 'tinymce/skins/ui/oxide/content.min.css';
////import 'tinymce/skins/ui/oxide/skin.min.css';


import  "tinymce/tinymce.js";
import  "tinymce/themes/silver/theme.js";
import  "tinymce/plugins/advlist/plugin.js";
import  "tinymce/plugins/autolink/plugin.js";
import  "tinymce/plugins/lists/plugin.js";
import  "tinymce/plugins/link/plugin.js";
import  "tinymce/plugins/image/plugin.js";
//import  "tinymce/plugins/charmap/plugin.js";
//import  "tinymce/plugins/print/plugin.js";
//import  "tinymce/plugins/preview/plugin.js";
import  "tinymce/plugins/hr/plugin.js";
//import  "tinymce/plugins/anchor/plugin.js";
//import  "tinymce/plugins/pagebreak/plugin.js";
import  "tinymce/plugins/searchreplace/plugin.js";
//import  "tinymce/plugins/wordcount/plugin.js";
//import  "tinymce/plugins/visualblocks/plugin.js";
//import  "tinymce/plugins/visualchars/plugin.js";
import  "tinymce/plugins/code/plugin.js";
//import  "tinymce/plugins/fullscreen/plugin.js";
import  "tinymce/plugins/insertdatetime/plugin.js";
//import  "tinymce/plugins/media/plugin.js";
import  "tinymce/plugins/nonbreaking/plugin.js";
//import  "tinymce/plugins/save/plugin.js";
import  "tinymce/plugins/table/plugin.js";
  //import  "tinymce/plugins/contextmenu/plugin.js";
//import  "tinymce/plugins/directionality/plugin.js";
//import  "tinymce/plugins/emoticons/plugin.js";
//import  "tinymce/plugins/template/plugin.js";
import  "tinymce/plugins/paste/plugin.js";
  //import  "tinymce/plugins/textcolor/plugin.js";
  //import  "tinymce/plugins/colorpicker/plugin.js";
//import  "tinymce/plugins/textpattern/plugin.js";
import  "tinymce/plugins/imagetools/plugin.js";
import { NG_VALUE_ACCESSOR } from '@angular/forms';
//import  "tinymce/plugins/codesample/plugin.js";
//import  "tinymce/plugins/toc/plugin.js";
//import  "tinymce/plugins/help/plugin.js";

declare var tinymce: any;

@Component({
  selector: 'app-wysiwyg',
  templateUrl: './wysiwyg.template.html',
  styleUrls: ['./wysiwyg.style.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WYSIWYGComponent),
      multi: true
    }
  ]
})
export class WYSIWYGComponent implements OnInit, OnDestroy {

  @ViewChild('wysiwyg', {read: ViewContainerRef}) textarea;

  private _innerValue: String = '';
  private _editor: any;

  private onTouchedCallback = () => {};
  private onChangeCallback: (_: any) => {};

  constructor(
    private ngZone: NgZone,
  ) { }

  ngOnInit() {
    tinymce.init({
      target: this.textarea.element.nativeElement,
      height: 350,
      //selector: 'textarea',  // change this value according to your HTML
      plugins: ['advlist', 'lists', 'autolink', 'link', 'image', 'hr', 'searchreplace', 'code', 'insertdatetime', 'nonbreaking', 'table', /*'contextmenu',*/ 'paste', /*'textcolor', 'colorpicker',*/ 'imagetools' ],
      toolbar1: 'undo redo | insert | styleselect | bold italic underline forecolor backcolor | link image | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent',
      skin: false,
      branding: false,
      setup: (editor: any) => {
        this._editor = editor;

        editor.on('init', () => {
          editor.setContent(this._innerValue);
        });
        
        editor.on('blur', () => {
          this.ngZone.run(() => this.onTouchedCallback());
        });

        editor.on('keyup change ExecCommand', () => {
          this.ngZone.run(() => this.onChangeCallback(editor.getContent()));
        });
      }
    });
  }

  ngOnDestroy() {
    tinymce.remove(this._editor);
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {
    //if (value !== this._innerValue) {
    //  this._innerValue = value;
    //}
    this._innerValue = value || this._innerValue;
    value = value || '';

    if (this._editor && this._editor.initialized && typeof value === 'string') {
      this._editor.setContent(value);
    }
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  insert(v: string) {
    this._editor.execCommand('mceInsertContent', false, v);
  }
}
