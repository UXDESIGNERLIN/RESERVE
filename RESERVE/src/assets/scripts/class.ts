import { getUrlParam, register, getClass, getCourse, ddmmyy, hhmm, NOP } from './utils';

let register_class = document.getElementById('register');
let full_name = document.getElementById('fname').getElementsByTagName('input')[0] as HTMLInputElement;
let email = document.getElementById('email').getElementsByTagName('input')[0] as HTMLInputElement;
let phone = document.getElementById('phone').getElementsByTagName('input')[0] as HTMLInputElement;
let age = document.getElementById('age').getElementsByTagName('input')[0] as HTMLInputElement;
let genders = document.getElementsByName('gender') as NodeListOf<HTMLInputElement>;
let courseName = document.getElementsByTagName('h1')[0];
let courseDescription = document.getElementById('descripcio');
let date = document.getElementById('date');
let tini = document.getElementById('tini');
let tend = document.getElementById('tend');


let classInfo: {
    id: string,
    courseId: string,
    companyId: string,
    name: string,
    description: string,
    type: string,
    reqInfo: string[],
    tsIni: number,
    len: number,
    numReserves: number,
    spots: number,
};



register_class.addEventListener("submit",register_class_submit);

function showDetail() {
    getClass(getUrlParam(1)).then((myClass) => {
        classInfo = myClass as any;
        //classInfo.numReserves = +classInfo.numReserves;
        render();
    });
}

function register_class_submit(e:any) {
    let gender = '';
    genders.forEach(
        x => {
            if(x.checked){
                gender = x.value;
            }
        }
    )
    e.preventDefault();
    register( getUrlParam(1)/*classid*/,{
        fname: full_name.value,
        email: email.value,
        phone: phone.value,
        age: age.value,
        gender: gender
    }).then(() => {
        classInfo.numReserves++;
        render();
    }, NOP);
}

showDetail();


function render() {
    date.innerHTML += ddmmyy(classInfo.tsIni);
    tini.innerHTML += hhmm(classInfo.tsIni);
    tend.innerHTML += hhmm(classInfo.tsIni + classInfo.len);
    renderSpots(classInfo.spots, classInfo.numReserves);

    courseName.innerHTML = classInfo.name;
    courseDescription.innerHTML = classInfo.description;
    classInfo.reqInfo.forEach((info: string) => {
        document.getElementById(info).classList.remove('hidden');
    });
}

function renderSpots(spotsTotal: number, numReserves: number) {
    let spots = document.getElementById('spots');
    let currentSpots = spotsTotal - numReserves;

    if (currentSpots <= 0) {
        spots.innerHTML = `<b>No spots left!</b>`
    } 
    else {
        spots.innerHTML = `<b>spots left:</b> ${currentSpots}`;
    }
}
