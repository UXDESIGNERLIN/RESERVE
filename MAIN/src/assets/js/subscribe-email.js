let subscribe_email_input = document.getElementById("subscribe_email_input");
let subscribe_email_btn = document.getElementById("subscribe_email_btn");
let card_title = document.getElementById("card_title");
let card_paragraph = document.getElementById("card_paragraph");

let error = false;

subscribe_email_input.addEventListener("input", () => {
  console.log('im changing')
  if (error) {
    error = false;
    subscribe_email_input.style.border = null;
    subscribe_email_input.style.backgroundColor = null;
  }
});

subscribe_email_btn.addEventListener("click", () => {
  let email = subscribe_email_input.value;
  if (validEmail(email)) post();
  else {
    subscribe_email_input.style.border = '2px solid red';
    subscribe_email_input.style.backgroundColor = '#FFCCCC';
    error = true;
  }
});

function post() {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      card_title.innerHTML = "Thank you!"
      card_paragraph.innerHTML = "We will keep you updated : )"
      subscribe_email_btn.style.display = "none"
      subscribe_email_input.style.display = "none"
    }
  };
  xhr.open("POST", "https://api.myspotbook.com/api/im_interested", true);
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.send(JSON.stringify({email: subscribe_email_input.value}));

}


function validEmail(email) {
  return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i.test(email);
}