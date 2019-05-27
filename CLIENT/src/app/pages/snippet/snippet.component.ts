import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-snippet',
  templateUrl: './snippet.component.html',
  styleUrls: ['./snippet.component.css']
})
export class SnippetComponent implements OnInit {

  snippetUrl: string;
  constructor(private sessionService: SessionService) { }

  ngOnInit() {
    this.getCompanyId();
  }

  getCompanyId() {
    this.sessionService.getSession().subscribe(
      (session) => {
        this.snippetUrl = `https://reserves.myspotbook.com/${session.companyId}`;
      }
    );
    
    /*
    <iframe src="http://reserves.myspotbook.com/:COMPANY ID:" frameborder="0" allowfullscreen></iframe>
    */
  }
  

  
}
