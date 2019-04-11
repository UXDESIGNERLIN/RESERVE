import { Course } from "./imported/course";
import { Class } from "./imported/class";

let base_api = "https://api.myspotbook.com/api/v0" 

let class_spots: number;


export function getUrlParam(p: number) {
  return window.location.pathname.split('/')[p+1];
}


export function getCourse (idCourse: number | string): Promise<Course> {
  return new Promise ( function (resolve:any, reject:any) {
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET",`${base_api}/course/${idCourse}`);
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
  
  let xhttp = new XMLHttpRequest();
  xhttp.open("POST",`${base_api}/class/${classId}/reserves`);
  xhttp.setRequestHeader('Content-type', 'application/json');
  xhttp.send(JSON.stringify(term));
}
