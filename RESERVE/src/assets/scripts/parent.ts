/*
* Script for the parent page to run
* Inspired by: https://www.codeproject.com/tips/585663/communication-with-cross-domain-iframe-a-cross-bro
*/
// Here "addEventListener" is for standards-compliant web browsers and "attachEvent" is for IE Browsers.
var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = (<any>window)[eventMethod];

// Listen to message from child IFrame window
eventer("attachEvent" ? "onmessage" : "message", function (e: any) {
  if (e.origin == 'https://reserve.myspotbook.com') {
    console.log(e.data);
  }
}, false);    