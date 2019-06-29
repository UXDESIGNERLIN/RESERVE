import { getUrlParam, register, getClass, getCourse, ddmmyy, hhmm, NOP, confirmation, getReserve } from './utils';


console.log('We have to load calendar', getUrlParam(0));

//url: base/confirmation/reservationId/confirmed or unsure
//reserveId example : 5D164EF2129C317277563AEA907F30FA

let reservationId = getUrlParam(1)
let confirm: boolean;
let confirm_section = document.getElementById("confirmed");
let unsure_section = document.getElementById("unsure");
let company_name = document.getElementById("company_name");
let course_name = document.getElementById("course_name");
let start = document.getElementById("start");
let organizer_contact = document.getElementById("organizer_contact");
let picture_url = document.getElementById("picture_url") as HTMLImageElement;

function show() {
    //console.log("button is clicked");
    if (getUrlParam(2) == "confirmed") {
        confirm = true
        confirm_section.setAttribute("style", "display: initial");
        //confirm_section.display = "initial";
    }
    else {
        confirm = false;
        unsure_section.setAttribute("style", "display: initial");
        //unsure_section.display = "initial"
    }
    console.log(getUrlParam(2),confirm_section, unsure_section);

}

show();

function render(reservationId:string) {
  getReserve(reservationId).then( (reserve)=>{
      company_name.innerHTML = reserve.data.companyName;
      course_name.innerHTML = reserve.data.name;
      start.innerHTML = reserve.data.tsIni;
      organizer_contact.innerHTML = reserve.data.contact;
      if(reserve.data.picture) {
        picture_url.src = `https://reserve.myspotbook.com/pictures/${reserve.data.picture}`;
      }
      else {
        picture_url.style.display = "none";
      }
      
      console.log("reserve", reserve, reserve.data.contact);
  })
}

render(reservationId);
/*
if (getUrlParam(2) == "confirmed") {
    confirm = true
    confirm_section = "initial";
}
else {
    confirm = false;
    unsure_section = "initial"
}
*/


function load() {
    console.log(reservationId, confirm);
    
    confirmation(reservationId, confirm).then(
        (x) => {
            console.log("hey",x);
        })
        .catch((error)=>{
            console.log(error);
        })
        
      
}

//load();
