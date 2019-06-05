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
      
    //console.log("COURSES ARE:", courses );
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

export function register(classId:string | number,term:any) {
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

function pad (v: number) {
  return ('00'+v).substr(-2);
}

export function ddmmyy(date: number) {
  let d = new Date(date*1000);
  return `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${pad(d.getFullYear())}`;
}

export function hhmm(date: number) {
  let d = new Date(date*1000);
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
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
      
      alert(apiRes.code);

      return Promise.reject(apiRes);
    });
}



export const NOP = () => {};