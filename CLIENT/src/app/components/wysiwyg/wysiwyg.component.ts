import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import * as tinymce from 'tinymce';
import 'tinymce/themes/silver/theme.js';

//import 'tinymce/skins/content/default/content.css';
//import 'tinymce/skins/ui/oxide/content.min.css';
//import 'tinymce/skins/ui/oxide/skin.min.css';

@Component({
  selector: 'app-wysiwyg',
  templateUrl: './wysiwyg.template.html',
  styleUrls: ['./wysiwyg.style.css']
})
export class WYSIWYGComponent implements OnInit {

  @ViewChild('wysiwyg', {read: ViewContainerRef}) textarea;

  constructor() { }

  ngOnInit() {
    tinymce.init({
      target: this.textarea.element.nativeElement,
      //selector: 'textarea',  // change this value according to your HTML
      plugin: 'a_tinymce_plugin',
      a_plugin_option: true,
      a_configuration_option: 400
    });
  }
}
