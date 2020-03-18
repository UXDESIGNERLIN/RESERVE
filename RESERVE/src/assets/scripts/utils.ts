import { Course } from "./imported/course";
import { Class } from "./imported/class";

let base_api = "https://api.myspotbook.com/api/v0" 

let class_spots: number;


export function getUrlParam(p: number) {
  return window.location.pathname.split('/')[p+1];
}


export function getCourse (courseId: number | string): Promise<Course> {
  return new Promise ( function (resolve:any, reject:any) {
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET",`${base_api}/course/${courseId}`);
    xhttp.onload = function() {
      let course = JSON.parse(xhttp.responseText).data;
      if (this.status >= 200 && this.status < 300){
        resolve(JSON.parse(xhttp.responseText).data);
      }else {
        reject(new Error('Broke'));
      }
    }
    xhttp.send();
  })
}


export function getAllClasses(companyId: number | string): Promise<[]> {
  return new Promise ( function (resolve:any, reject:any) {
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET",`${base_api}/company/${companyId}/classes`);
    xhttp.onload = function() {
      let courses = JSON.parse(xhttp.responseText).data;
      if (this.status >= 200 && this.status < 300){
        resolve(JSON.parse(xhttp.responseText).data);
      }else {
        reject(new Error('Broke'));
      }
    }
    xhttp.send();
  })
  
}

export function getClass(classId: number | string): Promise<Class> {
  return new Promise ( function (resolve:any, reject:any) {
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET",`${base_api}/class/${classId}`);
    xhttp.onload = function() {
      let myClass =  JSON.parse(xhttp.responseText).data;
      if (this.status >= 200 && this.status < 300){
        resolve(myClass);
      }else {
        reject(new Error('Broke'));
      }
    }
    xhttp.send();
  })
}

export function register(classId:string,term:any) {
  return APIRequest('POST', `${base_api}/class/${classId}/reserves`, term);

  //return new Promise((resolve, reject) => {
  //  let xhttp = new XMLHttpRequest();
  //  xhttp.open("POST",`${base_api}/class/${classId}/reserves`);
  //  xhttp.setRequestHeader('Content-type', 'application/json');
  //  xhttp.send(JSON.stringify(term));
  //  xhttp.onreadystatechange = function () {
  //    
  //  }
  //});
}

/* trying to get info of Course from reserveId*/ 
export function getReserve(reserveId:string) {
  return APIRequest('GET', `${base_api}/reserve/${reserveId}/info`, null);
}

export function confirmation(reserveId:string, confirm: boolean) {
  if(confirm) {
    return APIRequest('PUT', `${base_api}/reserve/${reserveId}/sure_attendance`, null);
  }
  else {
    return APIRequest('PUT', `${base_api}/reserve/${reserveId}/unsure_attendance`, null);
  }
  
}


function pad (v: number) {
  return ('00'+v).substr(-2);
}

export function isPast(date: number) {
  return (date*1000) < +(new Date());
}

export function ddmmyy(date: number) {
  let d = new Date(date*1000);
  let days = ['Sun','Mon','Tue','Wed','Thurs','Fri','Sat'];
  let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  //only show next year 
  if(d.getFullYear() > new Date().getFullYear()) {
  return `${days[d.getDay()]}, ` + " " + `${months[d.getMonth()]}` + " " +`${pad(d.getDate())}, ${d.getFullYear()}`;
  }
  return `${days[d.getDay()]}, ` + " " + `${months[d.getMonth()]}` + " " +`${pad(d.getDate())}`;
}

export function hhmm(date: number) {
  let d = new Date(date*1000);
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function mm(date: number) {
  let d = new Date(date*1000);
  let months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  return months[d.getMonth()];
}

export function dia(date: number) {
  return (new Date(date*1000)).getDate();
}

export function dd(date: number) {
  return pad(dia(date));
}

function makeRequest (method: 'GET' | 'POST' | 'PUT', url: string, body: any) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    if (body != null && typeof(body) == 'string') {
      xhr.setRequestHeader('Content-type', 'text/plain'); //  application/x-www-form-urlencoded      multipart/form-data
      xhr.send(body);
    }
    else if (body != null) {
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.send(JSON.stringify(body));
    }
    else {
      xhr.send();
    }
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.responseText);
      } else {
        reject(xhr.responseText);
        //reject({
        //  status: this.status,
        //  statusText: xhr.statusText,
        //  response: xhr.responseText
        //});
      }
    };
    xhr.onerror = function () {
      reject(`{success: false, code: "UNHANDLED_ERROR", data:""}`);
      //reject({
      //  status: this.status,
      //  statusText: xhr.statusText,
      //  response: xhr.responseText
      //});
    };
  });
}

interface APIResponse {
  success: boolean,
  code: string,
  data: any,
}

function APIRequest (method: 'GET' | 'POST' | 'PUT', url: string, body: any) {
  
  let parseJsonOrUnhandled = (r:string) => {
    try {
      return JSON.parse(r) as APIResponse;
    }
    catch (e) {
      return {success: false, code: "UNHANDLED_ERROR", data:""} as APIResponse;
    }
  }

  return makeRequest(method, url, body)
    .then(parseJsonOrUnhandled)
    .catch(parseJsonOrUnhandled)
    .then((apiRes) => {
      if (apiRes.success) return Promise.resolve(apiRes);
      
      Swal.fire({
        text: readableError(apiRes.code),
        icon: 'error',
      });
      //alert(apiRes.code);

      return Promise.reject(apiRes);
    });
}

declare const Swal: any;

function readableError(code:string, data:string = ''): string {
  //if the code is incorrect_Idpass, return "wrong user name or passwords" 
  //if(code == "INCORRECT_IDPASS") return "Wrong user name or password";
  //if(code == "UNHANDLED_ERROR") return "Unhandled error";

  switch (code) {
      // API-description error
      case 'API_ERROR' : return `Error#1001`;
      case 'METHOD_NOT_ALLOWED' : return `Error#1002`;

      // common method errors
      case 'MISSING_PARAMETER' : return `Error#1003#${data}`;
      case 'NOT_ALLOWED' : return `Error#1004`;
      case 'NOT_FOUND' : return `Error#1005`;

      // Reserves
      case 'ALREADY_STARTED' : return `This event has already started`;
      case 'FULL_CLASS' : return `Sorry 🙁 This event is full`;
      case 'FNAME_REQUIRED' : return `Your full name is required`;
      case 'AGE_REQUIRED' : return `Your age is required`;
      case 'GENDER_REQUIRED' : return `Your gender is required`;
      case 'EMAIL_REQUIRED' : return `Your e-mail is required`;
      case 'EMAIL_WRONG_FORMAT' : return `Your e-mail doesn't seem to be valid`;
      case 'ALREADY_REGISTERED' : return `You appear to already have a reservation for this event, please double check your email`;
      case 'PHONE_REQUIRED' : return `Your phone number is required`;
      case 'PHONE_WRONG_FORMAT' : return `Your phone doesn't seem to be valid`;

      case 'UNHANDLED_ERROR' :
      default : return `Unhandled error`;
  }
}


export const NOP = () => {};