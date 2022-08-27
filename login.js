var userid = document.getElementById("uid");
var password = document.getElementById("pwd");
var messagespan = document.getElementById("msg");
var auth;
messagespan.textContent = "";
console.log("msgspan");
async function onSubmitLogin() {
  try {
    auth = { userid: userid.value, password: password.value };
    console.log(auth);
    data = await postData(
      "https://rich-lapel-toad.cyclic.app/auth/signin",
      auth
    );
    console.log(data.token);
    localStorage.setItem("user", data.token); // JSON data parsed by `data.json()` call
    window.location.href = "list.html";
  } catch (err) {
    console.log(err.message);
  }
}

document.getElementById("loginbutton").addEventListener("click", onSubmitLogin);
document.getElementById("signupbutton").addEventListener("click", onSubmitSignup);

async function onSubmitSignup() {
  try {
    auth = { userid: userid.value, password: password.value };
    console.log(auth);
    data = await postData(
      "https://rich-lapel-toad.cyclic.app/auth/signup",
      auth
    );
    console.log(data.token);
    localStorage.setItem("user", data.token); // JSON data parsed by `data.json()` call
    window.location.href = "list.html";
  } catch (err) {
    console.log(err.message);
  }
}


async function postData(url = "", data = {}) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    console.log(response);
    if (response.ok) {
      messagespan.textContent = "";
      return await response.json();
    } else if (response.status === 500) {
      var da = await response.json();
      console.log(da);
      messagespan.textContent = da.error;
    } else {
      messagespan.textContent = "Something Wrong Check again Later";
    }
  } catch (err) {
    messagespan.textContent = "Something Wrong Check again later";
  }
}
