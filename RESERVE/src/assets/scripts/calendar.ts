import { getUrlParam, getAllClasses, getClass, ddmmyy, hhmm } from './utils';
import { Class } from './imported/class';


console.log('We have to load calendar', getUrlParam(0));


let class_template = document.getElementById('class_template') as Node;
/*
let picture_url = document.getElementById("picture_url") as HTMLImageElement;
let title = document.getElementById("card_title")
let place = document.getElementById("place");
let spots = document.getElementById("card_spots");
let dateTime = document.getElementById("card_dateTime");
let finishDateTime = document.getElementById("card_finishDateTime");
let spots_left = document.getElementById("card_spots_left");
*/
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
    console.log(classes);
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
  class_element.getElementsByClassName("card_startDateTime")[0].innerHTML = ddmmyy(card.tsIni);
  class_element.getElementsByClassName("card_finishDateTime")[0].innerHTML = hhmm(card.tsIni) + ' ' + "-" + ' ' + hhmm(card.tsIni + card.len);
  //About Date

  if (ddmmyy(card.tsIni) != ddmmyy(card.tsIni + card.len)) {
    class_element.getElementsByClassName("card_startDateTime")[0].innerHTML = ddmmyy(card.tsIni) + ' ' + hhmm(card.tsIni);
    class_element.getElementsByClassName("card_finishDateTime")[0].innerHTML = ddmmyy(card.tsIni + card.len) + ' ' + hhmm(card.tsIni + card.len);
  }

  if ((card.spots - card.numReserves) <= 5 && (card.numReserves > (card.spots - card.numReserves))) {
    class_element.getElementsByClassName("card_spots_going")[0].setAttribute("style", "display: inline-block");
    class_element.getElementsByClassName("card_spots_going")[0].innerHTML = card.numReserves + " going ";
    class_element.getElementsByClassName("card_spots_left")[0].innerHTML = "・" + (card.spots - card.numReserves).toString() + " spots left!";
    class_element.getElementsByClassName("card_spots_left")[0].setAttribute("style", "display: inline-block; color: #F64060");
  }
  else {
    class_element.getElementsByClassName("card_spots_going")[0].setAttribute("style", "display: none");
    class_element.getElementsByClassName("card_spots_left")[0].setAttribute("style", "display: inline-block");
    class_element.getElementsByClassName("card_spots_left")[0].innerHTML = (card.spots - card.numReserves).toString() + " spots available";
  }

  class_element.getElementsByClassName("place")[0].innerHTML = card.location;

  if (card.picture) {
    class_element.getElementsByClassName("render_image")[0].setAttribute("style", "display: initial");
    class_element.querySelector('img').src = `https://reserve.myspotbook.com/pictures/${card.picture}`

  }
  else {
    class_element.getElementsByClassName("render_image")[0].setAttribute("style", "display: none");
  }
  class_element.addEventListener("click", function directURL() {
    location.href = `/class/${card.id}`;
  });
  class_template.parentNode.appendChild(class_element);
}



render_classes(getUrlParam(0));
getClass(3);




