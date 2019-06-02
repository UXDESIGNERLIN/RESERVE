import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-snippet',
  templateUrl: './snippet.component.html',
  styleUrls: ['./snippet.component.css']
})
export class SnippetComponent implements OnInit {

  snippetUrl: string;
  snippetHTML: string;
  constructor(private sessionService: SessionService) { }

  ngOnInit() {
    this.getCompanyId();
  }

  getCompanyId() {
    this.sessionService.getSession().subscribe(
      (session) => {
        this.snippetUrl = `https://reserves.myspotbook.com/${session.companyId}`;
        this.snippetHTML = `<iframe src="${this.snippetUrl}" frameborder="0" allowfullscreen></iframe>`;
      }
    );
  }

  copyToClipboard(snippetId) {
    (document.getElementById(snippetId) as any).select();
    document.execCommand("copy");
  }
/*
  copyToClipboard() {
    (document.getElementById('snippetCopy') as any).select();
    document.execCommand("copy");
  }

  copyTextToClipboard() {
    (document.getElementById('textareaCopy') as any).select();
    document.execCommand("copy");
  }
*/
  /*
  <iframe src="http://reserves.myspotbook.com/:COMPANY ID:" frameborder="0" allowfullscreen></iframe>
  */
}




