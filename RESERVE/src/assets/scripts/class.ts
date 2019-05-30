import { getUrlParam, register, getClass, getCourse, ddmmyy, hhmm } from './utils';


console.log('We have to load class', getUrlParam(1));

let register_class = document.getElementById('register');
let full_name = document.getElementById('fname').getElementsByTagName('input')[0] as HTMLInputElement;
let email = document.getElementById('email').getElementsByTagName('input')[0] as HTMLInputElement;
let phone = document.getElementById('phone').getElementsByTagName('input')[0] as HTMLInputElement;
let age = document.getElementById('age').getElementsByTagName('input')[0] as HTMLInputElement;
let genders = document.getElementsByName('gender') as NodeListOf<HTMLInputElement>;
let gender: string;
let courseName = document.getElementsByTagName('h1')[0];
let courseDescription = document.getElementById('descripcio');
let date = document.getElementById('date');
let tini = document.getElementById('tini');
let tend = document.getElementById('tend');
let spots = document.getElementById('spots');




register_class.addEventListener("submit",register_class_submit);

function showDetail() {
    getClass(getUrlParam(1)).then((myClass) => {
        date.innerHTML += ddmmyy(myClass.tsIni);
        tini.innerHTML += hhmm(myClass.tsIni);
        tend.innerHTML += hhmm(myClass.tsIni + myClass.len);
        spots.innerHTML += (myClass.spots - (<any>myClass).numReserves).toString();

        courseName.innerHTML = (<any>myClass).name;
        courseDescription.innerHTML = (<any>myClass).description;
        (<any>myClass).reqInfo.forEach((info: string) => {
            document.getElementById(info).classList.remove('hidden');
        });
    })
  
    
}

function register_class_submit(e:any) {
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
    });
}

showDetail();
