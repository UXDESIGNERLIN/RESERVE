import { getUrlParam, getAllClasses, getClass, ddmmyy, hhmm } from './utils';
import { Class } from './imported/class';


console.log('We have to load calendar', getUrlParam(0));


let class_template = document.getElementById('class_template') as Node;
let picture_url = document.getElementById("picture_url") as HTMLImageElement;
let place = document.getElementById("place");
let start = document.getElementById("card_startDate");
let finish = document.getElementById("card_finishDate");
let spots = document.getElementById("card_spots");
let dateTime = document.getElementById("card_dateTime");
let finishDateTime = document.getElementById("card_finishDateTime");
let description = document.getElementById("card_description");
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
   // console.log(classes);
    classes.sort(function (a: Class, b: Class) {
      return a.tsIni - b.tsIni;
    });
    classes.forEach((x: any) => {
      render(x);
    });
  });
}



function render(card: any) {
  let class_element = class_template.cloneNode(true) as HTMLElement;
  class_element.removeAttribute("id");
  class_element.querySelector('h5').innerHTML = card.name;
  //start.innerHTML = ddmmyy(card.tsIni) + ' ' + hhmm(card.tsIni);
  dateTime.innerHTML = ddmmyy(card.tsIni);
  finishDateTime.innerHTML = hhmm(card.tsIni) + ' ' + "-"+ ' ' + hhmm(card.tsIni + card.len);
  //About Date
  
  if(ddmmyy(card.tsIni) != ddmmyy(card.tsIni + card.len)) {
    dateTime.innerHTML = ddmmyy(card.tsIni) + ' ' + hhmm(card.tsIni);
    finishDateTime.innerHTML = ddmmyy(card.tsIni + card.len) + ' ' + hhmm(card.tsIni + card.len);
  }
 
  spots.innerHTML = card.spots;
  card.spots <=1 ? spots.setAttribute("style", "color: red") : spots.setAttribute("style", "color: #A3A9AB")
  place.innerHTML = card.location;
  description.innerHTML = card.description;

  if(card.picture){
    picture_url.setAttribute("style", "display: initial");
    class_element.querySelector('img').src = `https://reserve.myspotbook.com/pictures/${card.picture}`
    
  }
  else {
    picture_url.setAttribute("style", "display: none");
  }
  class_element.addEventListener("click", function directURL () {
    location.href = `/class/${card.id}`;
  });
  class_template.parentNode.appendChild(class_element);
}



render_classes(getUrlParam(0));
getClass(3);




