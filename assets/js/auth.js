let api2 = "http://localhost:3000";

//todo **login page**
//sign up
function signUp() {
  document
    .querySelector(".form-creat")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      var userName = document.getElementById("userName").value;
      var email = document.getElementById("email").value;
      var password = document.getElementById("password").value;
      var phoneNumber = document.getElementById("phoneNumber").value;

      var data = {
        userName: userName,
        email: email,
        password: password,
        phoneNumber: phoneNumber,
      };

      fetch(`${api2}/api/v1/auth/signUp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          document.querySelector(".message-serv").innerText =
            data.message || "Error data";
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
}

//sign in
function signIn() {
  document
    .getElementById("loging-form")
    .addEventListener("submit", async function (e) {
      e.preventDefault();

      // استخدم FormData لجمع البيانات من النموذج
      const formData = new FormData(this);
      const email = formData.get("email");
      const password = formData.get("password");

      console.log(
        JSON.stringify({
          email,
          password,
        })
      );

      const response = await fetch(`${api2}/api/v1/auth/signIn`, {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log("#===>token", data.token);
      if (data?.success) {
        localStorage.setItem("token", JSON.stringify(data.token));
        window.location.href = "home.html";
      } else {
        console.log(data);
        document.querySelector(".message-serv2").innerText = data.error;
      }
    });
}

// log out

function logout() {
  localStorage.removeItem("token");

  location.reload();
}
