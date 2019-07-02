import { getUrlParam, getAllClasses, getClass, register, ddmmyy, hhmm } from './utils';
import { Class } from './imported/class';


console.log('We have to load calendar', getUrlParam(0));


let class_template = document.getElementById('class_template') as Node;
let picture_url = document.getElementById("picture_url") as HTMLImageElement; 
//let courseName = document.getElementById('courseName');

/*
function render_with_time(start:number, array_length:number) {
  let def: number;
  for(let i = 0; i <= array_length; i++){
    
  }
}
*/

function render_classes(companyId: number | string) {
  getAllClasses(companyId).then((classes) => {
    classes.sort(function (a: Class, b: Class) {
      return a.tsIni - b.tsIni;
    });
    classes.forEach((x: any) => {
      console.log("CLASSES", x);
      render(x);
    });
    //render(classes[0].name);
    //console.log("test classes",classes);
  });
}



function render(card: any) {
  let class_element = class_template.cloneNode(true) as HTMLElement;
  class_element.removeAttribute("id");
  //class_element.getElementsByTagName("h5")[0].innerHTML = card;
  class_element.querySelector('h5').innerHTML = card.name;
  class_element.querySelectorAll('p')[0].innerHTML = ddmmyy(card.tsIni) + ' ' + hhmm(card.tsIni);
  class_element.querySelectorAll('p')[1].innerHTML = card.len;
  class_element.querySelectorAll('p')[2].innerHTML = card.spots;
  //class_element.classList.remove("card-body");
  //courseName.innerHTML = card;
  if(card.picture){
    picture_url.setAttribute("style", "display: initial");
    class_element.querySelector('img').src = `https://reserve.myspotbook.com/pictures/${card.picture}`
    
  }
  else {
    picture_url.setAttribute("style", "display: none");
  }

  class_element.getElementsByTagName('a')[0].addEventListener("click", function directURL() {
    location.replace(`/class/${card.id}`);
  });
  class_template.parentNode.appendChild(class_element);
}

function classIdUrl() {
  console.log("hey test");
  //console.log("companyId: ", companyId, " ClassId: ", classId);
  //location.replace(`https://api.myspotbook.com/api/v0/${companyId}/class/${classId}`);
}

/*
function render_image (render_image) {

}
*/
/*
function render_image (img_ref:any) { 
  var img = $(img_ref);
  img.on('load', function () {

  img.css("width", "auto");
  img.css("height", "auto");

  var maxWidth = 180; // Max width for the image
  var maxHeight = 180;    // Max height for the image
  var ratio = 0;  // Used for aspect ratio
  var width = img.width();    // Current image width
  var height = img.height();  // Current image height

  if (width > maxWidth && width > height) {
      
      ratio = width / height;
      img.css("height", maxWidth/ratio);
      img.css("width", maxWidth); // Set new width

  }else  if (height > maxHeight && height > width){
      
      ratio = height / width;
      img.css("width", maxHeight/ratio);
      img.css("height", maxHeight);
  }else {

      img.css("width", maxWidth);
      img.css("height", maxHeight);
  }

    });
}
*/
render_classes(getUrlParam(0));
getClass(3);




