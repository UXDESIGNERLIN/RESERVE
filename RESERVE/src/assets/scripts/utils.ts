import { Course } from "./imported/course";

let base_api = "https://api.myspotbook.com/api/v0" 

let class_spots: number;
let courses;
let classes;

export function getUrlParam(p: number) {
  return window.location.pathname.split('/')[p+1];
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

export function getClass(classId: number | string) {
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET",`${base_api}/class/${classId}`);
  xhttp.onload = function() {
   classes =  JSON.parse(xhttp.responseText);
   console.log("CLASSES ARE", classes);
  }
  xhttp.send();
}

export function register(classId:number,term:any) {
  
  let xhttp = new XMLHttpRequest();
  xhttp.open("POST",`${base_api}/class/${classId}/reserves`);
  xhttp.setRequestHeader('Content-type', 'application/json');
  xhttp.send(JSON.stringify(term));
}
