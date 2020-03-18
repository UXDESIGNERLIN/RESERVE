import { getUrlParam, register, getClass, getCourse, ddmmyy, hhmm, NOP, mm, dia, isPast } from './utils';

let register_class = document.getElementById('register');
let full_name = document.getElementById('fname').getElementsByTagName('input')[0] as HTMLInputElement;
let email = document.getElementById('email').getElementsByTagName('input')[0] as HTMLInputElement;
let phone = document.getElementById('phone').getElementsByTagName('input')[0] as HTMLInputElement;
let age = document.getElementById('age').getElementsByTagName('input')[0] as HTMLInputElement;
let genders = document.getElementsByName('gender') as NodeListOf<HTMLInputElement>;
let courseName = document.getElementsByTagName('h1')[0];
let courseDescription = document.getElementById('descripcio');
let date = document.getElementById('date');
let secondDate = document.getElementById('second_Date');
let tini = document.getElementById('tini');
let tend = document.getElementById('tend');
let picture_url = document.getElementById('picture_url') as HTMLImageElement;
let addCalendar = document.getElementById('addCalendar');
let rsvp = document.querySelector(".rsvp");


let dateMonth = document.querySelector(".date-thumb .month");
let dateDay = document.querySelector(".date-thumb .date");

let classInfo: {
    id: string,
    //courseId: string,
    companyId: string,
    name: string,
    description: string,
    type: string,
    reqInfo: string[],
    tsIni: number,
    len: number,
    numReserves: number,
    spots: number,
    picture: string,
    location: string

};

//rsvp.addEventListener("click", scrollToRsvp);

addCalendar.addEventListener("click", addToGoogleCalendar);

register_class.addEventListener("submit", register_class_submit);

//nav.addEventListener("click", dropDownMenu);

function showDetail() {
    getClass(getUrlParam(1)).then((myClass) => {
        console.log(myClass);
        classInfo = myClass as any;
        //classInfo.numReserves = +classInfo.numReserves;
        render();
    });
}

function register_class_submit(e: any) {
    let gender = '';
    genders.forEach(
        x => {
            if (x.checked) {
                gender = x.value;
            }
        }
    )
    e.preventDefault();
    register(getUrlParam(1)/*classid*/, {
        fname: full_name.value,
        email: email.value,
        phone: phone.value,
        age: age.value,
        gender: gender
    }).then(() => {
        classInfo.numReserves++;
        render();
        postRegister();
    }, NOP);
}

showDetail();

function postRegister() {
    //register_class.innerHTML = 
    //`<i class="far fa-paper-plane airplane-icon"></i><h1>Thank you for registering!<h1><br><p>See you soon</p>`;
    register_class.innerHTML = 
    `<div id="postReserve"></div>`;
}

function render() {
    renderTime();
    /*
    date.innerHTML = ddmmyy(classInfo.tsIni);
    tini.innerHTML = hhmm(classInfo.tsIni);
    tend.innerHTML = hhmm(classInfo.tsIni + classInfo.len);
    if (ddmmyy(classInfo.tsIni) != ddmmyy(classInfo.tsIni + classInfo.len)) {
        //class_element.getElementsByClassName("card_startDateTime")[0].innerHTML = ddmmyy(card.tsIni) + ' ' + hhmm(card.tsIni);
        //class_element.getElementsByClassName("card_finishDateTime")[0].innerHTML = ddmmyy(card.tsIni + card.len) + ' ' + hhmm(card.tsIni + card.len);
      }
      */
    renderSpots(classInfo.spots, classInfo.numReserves);

    renderSections(classInfo.spots, classInfo.numReserves, classInfo.tsIni);

    courseName.innerHTML = classInfo.name;
    courseDescription.innerHTML = classInfo.description;
    classInfo.reqInfo.forEach((info: string) => {
        document.getElementById(info).classList.remove('hidden');
    });
    if (classInfo.picture) {
        picture_url.src = `https://reserve.myspotbook.com/pictures/${classInfo.picture}`;
    }
    else {
        picture_url.style.display = "none"
    }


}

function renderTime() {
    date.innerHTML = ddmmyy(classInfo.tsIni);
    tini.innerHTML = hhmm(classInfo.tsIni);
    tend.innerHTML = hhmm(classInfo.tsIni + classInfo.len);
    if (ddmmyy(classInfo.tsIni + classInfo.len ) != ddmmyy(classInfo.tsIni) ){
        secondDate.innerHTML = ddmmyy(classInfo.tsIni+ classInfo.len);
    }


    dateMonth.innerHTML = mm(classInfo.tsIni);
    dateDay.innerHTML = dia(classInfo.tsIni).toString();
}

function renderSpots(spotsTotal: number, numReserves: number) {
    let spots = document.getElementById('spots');
    let currentSpots = spotsTotal - numReserves;

    if (currentSpots <= 0) {
        spots.innerHTML = `<b>No spots left!</b>`
    }
    else {
        spots.innerHTML = `${currentSpots} spots left`;
    }
}

function renderSections(spotsTotal: number, numReserves: number, tsIni: number) {
    if (isPast(tsIni) || numReserves >= spotsTotal) {
        document.getElementById('late-section').classList.remove('hidden');
    }
    else {
        document.getElementById('register-section').classList.remove('hidden');
    }
}

function addToGoogleCalendar() {
    let ts = new Date(classInfo.tsIni * 1000);
    let te = new Date((classInfo.tsIni + classInfo.len) * 1000);
    let startTime = timeGoogle(ts);
    let endTime = timeGoogle(te);
    console.log(startTime, endTime);
    location.replace(`https://calendar.google.com/calendar/r/eventedit?text=${classInfo.name}&location=${classInfo.location}&dates=${startTime}/${endTime}&details=${classInfo.description}&ctz=Spain/Madrid`);
}


function pad(v: number) {
    return ('00' + v).substr(-2);
}
function timeGoogle(d: Date) {
    //return d.getTime();
    return `${d.getFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00Z`;
}

function scrollToRsvp() {
    let position = register_class.getBoundingClientRect();
    window.scrollTo({top:  position.bottom, left: position.left, behavior:"smooth"}); 
}

