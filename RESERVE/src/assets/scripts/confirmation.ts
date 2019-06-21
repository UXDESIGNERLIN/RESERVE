import { getUrlParam, register, getClass, getCourse, ddmmyy, hhmm, NOP, confirmation } from './utils';


console.log('We have to load calendar', getUrlParam(0));

//url: base/confirmation/reservationId/confirmed or unsure
//reserveId example : 5D0CA70FF322271EED2509BEFAF65823

let reservationId = getUrlParam(1)
let confirm: boolean;
if (getUrlParam(2) == "confirmed") {
    confirm = true
}
else {
    confirm = false;
}

function load() {
    console.log(reservationId, confirm);
    
    confirmation(reservationId, confirm).then(
        (x) => {
            console.log(x);
        })
        .catch((error)=>{
            console.log(error);
        })
        
      
}

load();



 


console.log("hello");