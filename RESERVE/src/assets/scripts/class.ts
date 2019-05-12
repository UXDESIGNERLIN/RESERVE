import { getUrlParam, register, getClass, getCourse } from './utils';


console.log('We have to load class', getUrlParam(1));

let register_class = document.getElementById('register');
let full_name = document.getElementById('fname').getElementsByTagName('input')[0] as HTMLInputElement;
let email = document.getElementById('email').getElementsByTagName('input')[0] as HTMLInputElement;
let phone = document.getElementById('phone').getElementsByTagName('input')[0] as HTMLInputElement;
let age = document.getElementById('age').getElementsByTagName('input')[0] as HTMLInputElement;
let genders = document.getElementsByName('gender') as NodeListOf<HTMLInputElement>;
let gender: string;
let courseName = document.getElementsByTagName('h1')[0];
let courseDescription = document.getElementsByTagName('h5')[0];




register_class.addEventListener("submit",register_class_submit);

function showDetail() {
    getClass(getUrlParam(1)).then((myClass) => {
        getCourse(myClass.courseId).then( (x) => {
            courseName.innerHTML = x.name;
            courseDescription.innerHTML = x.description;
            console.log(" REQINFO: ",x.reqInfo);
            x.reqInfo.forEach( (info) => {
                document.getElementById(info).style.display = "";
                
            })

            console.log(x);
        })
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
    })
    console.log("registered", {
        fname: full_name.value,
        email: email.value,
        phone: phone.value,
        age: age.value,
        gender: gender
    });
    
}

showDetail();

//.getAtrribute("id").value

/*
register(9,{ 
    fname: null,
    email: "kkk2@gmail.com",
    phone: "+34 973205546",
    age: null,
    gender: null,});
  */
