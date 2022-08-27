var count;
var allts
var pendts;
var cants;
var comts;
pendingcount = document.getElementById("pendingcount");
completedcount = document.getElementById("completedcount");
canceledcount = document.getElementById("canceledcount");
deletedcount = document.getElementById("deletedcount");
fetch("https://rich-lapel-toad.cyclic.app/task/report", {
  headers: { Authorization: "Bearer " + localStorage.user },
})
  .then((data) => {
    if(data.ok){
    data.json().then((d) => {
      console.log(d);
      count = d.count;
      pendingcount.innerText = count.pending;
      completedcount.innerText = count.completed;
      canceledcount.innerText = count.canceled;
      deletedcount.innerText = count.deleted;
      pendts = d.tasks.pending;
      cants = d.tasks.canceled;
      comts = d.tasks.completed;
    });
    }
    else{
      window.location.href="login.html";
    }
  })
  .catch((error) => {
    window.location.href="login.html";
  });
fetch("https://rich-lapel-toad.cyclic.app/task/list", {
    headers: { Authorization: "Bearer " + localStorage.user },
 })
  .then((data) => {
    if(data.ok){
      data.json().then((d) => {
        disptask(d.tasks)
        allts = d.tasks
        console.log(d);
      });
    }
    else{
      window.location.href="login.html";
    }
  })
  .catch((error) => {
    window.location.href="login.html";
    console.log(error);
  });

document.getElementById("signoutbutton").addEventListener("click", onSignoutButton);
document.getElementById("btnradio1").addEventListener("click", alltsbutton);
document.getElementById("btnradio2").addEventListener("click", pendtsbutton);
document.getElementById("btnradio3").addEventListener("click", comtsbutton);
document.getElementById("btnradio4").addEventListener("click", cantsbutton);
document.getElementById("taskform").addEventListener("submit", onNewtask);



function alltsbutton(){
  disptask(allts);
}

function pendtsbutton(){
  disptask(pendts);
}

function comtsbutton(){
  disptask(comts);
}

function cantsbutton(){
  disptask(cants);
}

function onSignoutButton(){
  fetch(`https://rich-lapel-toad.cyclic.app/auth/signout`, {
    method: "POST",
    headers: { Authorization: "Bearer " + localStorage.user },
  }).then((da)=>{
    da.json().then((daj)=>console.log(daj));
    window.location.href = "login.html";
  });
}

function ondelbutton(elem){
  fetch(`https://rich-lapel-toad.cyclic.app/task/delete/${elem}`, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + localStorage.user },
  }).then(()=>{
    console.log(elem)
    window.location.reload();
  });
}

function ontickbutton(elem){
  fetch(`https://rich-lapel-toad.cyclic.app/task/completed/${elem}`, {
    method: "PATCH",
    headers: { Authorization: "Bearer " + localStorage.user },
  }).then(()=>{
    console.log(elem)
    window.location.reload();
  });
}

function oncrossbutton(elem){
  fetch(`https://rich-lapel-toad.cyclic.app/task/cancel/${elem}`, {
    method: "PATCH",
    headers: { Authorization: "Bearer " + localStorage.user },
  }).then(()=>{
    console.log(elem)
    window.location.reload();
  });
}

async function onNewtask(event){
  try{
  event.preventDefault();
  var intask = document.getElementById("inputtask");
  var inprio = document.getElementById("inputpriority");
  const data = {name:intask.value, priority:inprio.value};
  console.log(data);
  const res = await fetch(`https://rich-lapel-toad.cyclic.app/task/create`, {
    method: "POST",
    headers: { "Authorization": "Bearer " + localStorage.user,"Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  window.location.reload();
  }
  catch(e){
    console.log(e);
  }
  
  //.then((da)=>{
    //console.log(da);
    //da.json().then((daj)=>console.log(daj));
  //}).catch((e)=>console.log(e));
}

function disptask(tasks) {
  var alltasks = document.getElementById("alltask");
  alltasks.innerHTML = '';
  tasks.forEach(t => {
    var stat = " "
    if(t.status==="com"){
      stat = '✅';
    }
    else if(t.status==="can"){
      stat = '❌';
    }
    else{
      stat = '   ';
    }
    var lielement = `<li class="list-group-item "><span class="index">${t.index}.</span>${t.name}
    <span class="priority">(${t.priority})</span>[<span class="status">${stat}</span>]
    <div class="controlbuttons" style="text-align: right;">
    ${t.status==="pen"?`<i class="fa-solid fa-check completedbtn" onclick="ontickbutton(${t.index})"></i> <i class="fa-solid fa-xmark cancelbtn" onclick="oncrossbutton(${t.index})"></i>`:""}
    <i class="fa-solid fa-trash-can deletebtn" onclick="ondelbutton(${t.index})" ></i>
    </div>
    </li>`;
    var div = document.createElement("div");
    div.innerHTML = lielement.trim();
    alltasks.appendChild(div);
  });
}