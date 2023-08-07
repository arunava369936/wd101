let element = (id) => document.getElementById(id);

let classes = (classes) => document.getElementsByClassName(classes);



let username = element("name"),
  email = element("email"),
  password = element("password"),
  term = element("terms"),
  dob = element("dob");

let errormsg = classes("errormsg");

let form = element("form");


function checkage(){
    let age = new Date().getFullYear() - new Date(dob.value).getFullYear();
    if(age < 18 || age>55){
        return false;
    }else{
        return true;
    }
}

let messageemail = "Email must be valid";
let messageagree = "you have to agree term and condition";
let messagedob = "You age must be between 18 and 55 to continue";



email.addEventListener("input", (event) => {
    let cond_email = !(email.value.includes("@") && email.value.includes("."));
    event.preventDefault();
    verifier(email,messageemail,cond_email);
});

dob.addEventListener("input", (event) => {
    let conddob = !checkage();
    event.preventDefault();
    verifier(dob,messagedob,conddob);
});
term.addEventListener("input", (event) => {
    let cond_agree = !term.checked;
    event.preventDefault();
    verifier(tc,messageagree,cond_agree);
});

function makeObject(){
    let check = false;
    if(term.checked){
        check = true;
    }
    let obj = {
        name: username.value,
        email: email.value,
        password: password.value,
        dob: dob.value,
        checked: check
    }
    return obj;
}




form.addEventListener("submit", (e) => {
     console.log("hellow world")
    let cond_agree= !term.checked;
    e.preventDefault();
    if (!cond_agree) {
        let obj = makeObject();
        userentries.push(obj);
        localStorage.setItem("userentries", JSON.stringify(userentries));
    }
    displayTable();
});
window.onload = (event) => {
    displayTable();
};
let user_entries = [];

function maketable(){
    let obj = localStorage.getItem("userentries");
    if(obj){
        userentries = JSON.parse(obj);
    }else{
        userentries = [];
    }
    return userentries;
}
userentries = maketable();
function displayTable(){
  let table = element("table");
  let entries = userentries;
  let str = `<tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Dob</th>
                  <th>Accepted terms?</th>
              </tr>\n`;
  for(let i=0;i<entries.length;i++){
      str += `<tr>
                  <td>${entries[i].name}</td>
                  <td>${entries[i].email}</td>
                  <td>${entries[i].password}</td>
                  <td>${entries[i].dob}</td>
                  <td>${entries[i].checked}</td>
              </tr>\n`;
              console.log("hello32")
  }
  table.innerHTML = str;
}
function verifier(elem,message,cnd){
  if(cnd){
      elem.style.border = "2px solid red";
      elem.setCustomValidity(message);
      elem.reportValidity();
  }else{
      elem.style.border = "2px solid green";
      elem.setCustomValidity('');

  }
}
console.log("Hello GitHub!");





