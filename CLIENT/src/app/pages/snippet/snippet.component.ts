import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';

@Component({
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
        this.snippetUrl = `https://reserve.myspotbook.com/${session.companyId}`;
        this.snippetHTML = `<iframe src="${this.snippetUrl}" frameborder="0" allowtransparency="true" style="background-color: transparent;" allowfullscreen><p>Your browser does not support iframes, please check the content <a href="${this.snippetUrl}">here</a>.</p></iframe>`;
      }
    );
  }

  copyToClipboard(snippetId) {
    (document.getElementById(snippetId) as HTMLTextAreaElement | HTMLInputElement).disabled = false;
    (document.getElementById(snippetId) as HTMLTextAreaElement | HTMLInputElement).select();
    (document.getElementById(snippetId) as HTMLTextAreaElement | HTMLInputElement).disabled = true;
    document.execCommand("copy");
  }

}




