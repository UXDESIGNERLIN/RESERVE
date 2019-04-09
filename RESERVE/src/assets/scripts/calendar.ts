import { getUrlParam, getAllClasses, getClass, register } from './utils';


console.log('We have to load calendar', getUrlParam(0));


let class_template = document.getElementById('class_template') as Node;
//let courseName = document.getElementById('courseName');




function render_classes(companyId:number | string) {
  getAllClasses(companyId).then((classes) => {
    classes.forEach((x:any) => {
      console.log("CLASSES",x);
      render(x);
    });
    //render(classes[0].name);
    //console.log("test classes",classes);
  });
}


function render(card:any ) {
  let class_element = class_template.cloneNode(true) as HTMLElement;
  class_element.removeAttribute("id");
  //class_element.getElementsByTagName("h5")[0].innerHTML = card;
  class_element.querySelector('h5').innerHTML = card.name;
  class_element.querySelectorAll('p')[0].innerHTML = card.tsIni;
  class_element.querySelectorAll('p')[1].innerHTML = card.len;
  class_element.querySelectorAll('p')[2].innerHTML = card.spots;
  //class_element.classList.remove("card-body");
  //courseName.innerHTML = card;
  class_template.parentNode.appendChild(class_element);
}

// class="card-body" id="class_template"

render_classes(getUrlParam(0));

//getClass(5);

/*
register(9,{ 
    fname: null,
    email: "kkk2@gmail.com",
    phone: "+34 973205546",
    age: null,
    gender: null,});
  */
