document
  .querySelector(".login-form")
  .addEventListener("submit", function (event) {
    // منع الحدث الافتراضي
    event.preventDefault();

    // احصل على قيم المستخدم وكلمة المرور
    let username = document.querySelector('input[type="email"]').value;
    let password = document.querySelector('input[type="password"]').value;

    // تحقق من المستخدم وكلمة المرور
    if (username === "admin@gmail.com" && password === "admin") {
      // إذا كانت القيم صحيحة، افتح صفحة log.html
      window.location.href = "prof.html";
    } else {
      // إذا كانت القيم غير صحيحة، أظهر رسالة خطأ
      alert("Invalid username or password!");
    }
  });

("use strict");

async function getUser() {
  const token = localStorage.getItem("token");
  console.log("token", token);
  const response = await fetch("https://gara4ko.onrender.com/api/v1/user", {
    headers: {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTc1NmE3MDYwYjI1YzY4MWE0NDdiOSIsImVtYWlsIjoidmlwdGUzbzJAZ21haWwuY29tIiwidXNlck5hbWUiOiJtb2hhbWVkbW90ZTMiLCJjcmVhdGVkQXQiOiIyMDI0LTAzLTA1VDE3OjMwOjE1LjU1N1oiLCJyb2xlIjoic3VwZXJBZG1pbiIsImlhdCI6MTcxNDA2NzYwMiwiZXhwIjoxNzE0ODQ1MjAyfQ.Mmv2rL-JI782uyudPsCz492FrgYPzNdFuFp9c8IzZFQ",
    },
  });
  const data = await response.json();
  console.log(data);
  return data;
}
getUser();
// الداتا بيز وقعت

/**
 * element toggle function
 */

const elemToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const overlay = document.querySelector("[data-overlay]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");

const navElemArr = [overlay, navCloseBtn, navOpenBtn];

/**
 * close navbar when click on any navbar link
 */

for (let i = 0; i < navbarLinks.length; i++) {
  navElemArr.push(navbarLinks[i]);
}

/**
 * addd event on all elements for toggling navbar
 */

for (let i = 0; i < navElemArr.length; i++) {
  navElemArr[i].addEventListener("click", function () {
    elemToggleFunc(navbar);
    elemToggleFunc(overlay);
  });
}

let saerchform = document.querySelector(".search-form");
document.querySelector("#search-btn").onclick = () => {
  saerchform.classList.toggle("active");
  shoppingCart.classList.remove("active");
  loginForm.classList.remove("active");
  navbar.classList.remove("active");
};

let shoppingCart = document.querySelector(".shopping-cart");
document.querySelector("#cart-btn").onclick = () => {
  shoppingCart.classList.toggle("active");
  saerchform.classList.remove("active");
  loginForm.classList.remove("active");
  navbar.classList.remove("active");
};

/**
 * header active state
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  window.scrollY >= 400
    ? header.classList.add("active")
    : header.classList.remove("active");
});

// cart trash

// احصل على العنصر الأب 'shopping-cart'
let cart = document.querySelector(".shopping-cart");

// أضف مستمع الحدث للعنصر الأب
cart.addEventListener("click", function (event) {
  // تحقق إذا كان الزر الذي تم النقر عليه هو زر الحذف
  if (
    event.target.classList.contains("fas") &&
    event.target.classList.contains("fa-trash")
  ) {
    // منع الحدث الافتراضي
    event.preventDefault();

    // احصل على العنصر الأب 'box' وأزله
    let box = event.target.closest(".box");
    box.remove();

    // تحقق من عدد العناصر 'box' المتبقية
    let remainingBoxes = document.querySelectorAll(".content");
    if (remainingBoxes.length === 0) {
      // إذا لم يعد هناك عناصر 'box'، أزل العناصر الأخرى وأضف الرسالة
      document.querySelector(".total").remove();
      document.querySelector(".check-cart").remove();
      let message = document.createElement("div");
      message.textContent = "add to cart first";
      document.querySelector(".shopping-cart").appendChild(message);
    }
  }
});

let profTop = document.querySelectorAll(".prof-top .menu li .sec-link");
profTop.forEach(function (el) {
  el.onclick = function () {
    profTop.forEach(function (el) {
      el.classList.remove("active");
    });
    this.classList.add("active");
  };
});

/**
 * login page
 */

let btnLog = document.querySelector("section.login .log-btn");
let btnCreat = document.querySelector("section.login .creat-btn");
let logForm = document.querySelector("section.login .form-login");
let creatForm = document.querySelector("section.login .form-creat");

btnLog.onclick = () => {
  creatForm.style.display = "none"; 
  logForm.style.display = "block";
};

btnCreat.onclick = () => {
  logForm.style.display = "none"; 
  creatForm.style.display = "block";
};

//------------------------------------
// sign in
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

    const response = await fetch(
      "https://gara4ko.onrender.com/api/v1/auth/signIn",
      {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),

        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    console.log("#===>token", data.token);
    if (data?.success) {
      localStorage.setItem("token", JSON.stringify(data.token));
      window.location.href = "prof.html";
      //اخيرا
    } else {
      console.log(data);
      document.querySelector(".message-serv2").innerText =
        "wrong email or password";
    }
  });







  
//-------------------------------------
//sign up
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

    fetch("https://gara4ko.onrender.com/api/v1/auth/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        document.querySelector(".message-serv").innerText = data.message;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

//******************************* */

