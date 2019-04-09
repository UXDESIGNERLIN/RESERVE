import { getUrlParam, register } from './utils';

console.log('We have to load class', getUrlParam(1));

let register_class = document.getElementById('register');
let full_name = document.getElementById('fname') as HTMLInputElement;
let email = document.getElementById('email') as HTMLInputElement;
let phone = document.getElementById('phone') as HTMLInputElement;
let age = document.getElementById('age') as HTMLInputElement;
let genders = document.getElementsByName('gender') as NodeListOf<HTMLInputElement>;
let gender: string;
register_class.addEventListener("submit",register_class_submit);

function register_class_submit(e:any) {
    genders.forEach(
        x => {
            if(x.checked){
                gender = x.value;
            }
        }
    )
    e.preventDefault();
    register(9,{
        fname: full_name.value,
        email: email.value,
        phone: phone.value,
        age: age.value,
        gender: gender
    })
    console.log("registered", {
        fname: full_name.value,
        email: email.value,
        phone: phone.value,
        age: age.value,
        gender: gender
    });
    
}
/*
register(9,{ 
    fname: null,
    email: "kkk2@gmail.com",
    phone: "+34 973205546",
    age: null,
    gender: null,});
  */
