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

///*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/

// user data

function userData() {
  const token = JSON.parse(localStorage.getItem("token"));

  fetch("https://gara4ko.onrender.com/api/v1/user/", {
    method: "GET",
    headers: {
      token: token,
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      document.querySelector(".name-user").innerText = data.data.userName;
      document.querySelector(".name").innerText = data.data.userName;
      document.querySelector(".email").innerText = data.data.email;
      document.querySelector(".phone-user").innerText = data.data.phoneNumber;
    })
    .catch((error) => console.error("Error:", error));
}

// function deleteVehicle(id) {
//   console.log(JSON.parse(id));
// const response = await fetch(`https://gara4ko.onrender.com/api/v1/vehicle/${id}`,{
//   headers:{
//     token:JSON.parse(localStorage.getItem("token"))
//   }
// })
// const data = await response.json()
// console.log('response delete',data)
// }

function vicData() {
  // const token = JSON.parse(localStorage.getItem("token"));

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTc1NmE3MDYwYjI1YzY4MWE0NDdiOSIsImVtYWlsIjoidmlwdGUzbzJAZ21haWwuY29tIiwidXNlck5hbWUiOiJtb2hhbWVkbW90ZTMiLCJjcmVhdGVkQXQiOiIyMDI0LTAzLTA1VDE3OjMwOjE1LjU1N1oiLCJyb2xlIjoic3VwZXJBZG1pbiIsImlhdCI6MTcxNDA2NzYwMiwiZXhwIjoxNzE0ODQ1MjAyfQ.Mmv2rL-JI782uyudPsCz492FrgYPzNdFuFp9c8IzZFQ";

  fetch("https://gara4ko.onrender.com/api/v1/vehicle/vehicles", {
    method: "GET",
    headers: {
      token: token,
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let box = ``;
      // let vec1 = data.data[0]?._id;
      // let vec2 = data.data[1]?._id;
      // let vec3 = data.data[2]?._id;

      for (let i = 0; i < data.data.length; i++) {
        console.log("data loop", data.data[i]?._id);
        
        box += `
        <tr class="item">
          <td>${i + 1}</td>
          <td>${data.data[i]?.vehicle_info.type}</td>
          <td>${data.data[i]?.vehicle_info.model}</td>
          <td>${data.data[i]?.vehicle_license.licenseNumbers.join(" ")}</td>
          <td>${data.data[i]?.vehicle_license.licenseLetters.join(" ")}</td>
          <td><i class="fa-solid fa-pen-to-square"></i></td>
          <td><i class="fa-solid fa-trash" onclick="deleteVehicle('${data.data[i]?._id}')"></i></td>
        </tr>
        `;
        ;
      }
      document.getElementById("vehiceRow").innerHTML = box;

      console.log(data);
    })

    .catch((error) => console.error("Error:", error));
}
// Add vechicle

function vecAdd() {
  document
    .querySelector(".vec-creat")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      var licenseLetters = document.getElementById("licenseLetters").value;
      var licenseNumbers = document.getElementById("licenseNumbers").value;
      var type = document.getElementById("type").value;
      var model = document.getElementById("model").value;
      var endOfLicense = document.getElementById("endOfLicense").value;
      var beginningOfLicense =
        document.getElementById("beginningOfLicense").value;

      // تحويل القيم إلى مصفوفات إذا كانت سلاسل نصية
      if (typeof licenseLetters === "string") {
        licenseLetters = licenseLetters.split("");
      }
      if (typeof licenseNumbers === "string") {
        licenseNumbers = licenseNumbers.split("").map(Number);
      }

      var data = {
        licenseLetters: licenseLetters,
        licenseNumbers: licenseNumbers,
        type: type,
        model: model,
        endOfLicense: endOfLicense,
        BeginningOfLicense: beginningOfLicense,
      };

      var token = JSON.parse(localStorage.getItem("token"));

      fetch("https://gara4ko.onrender.com/api/v1/vehicle/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          document.querySelector(".messageVec").innerText = data.message;

          if (
            document.querySelector(".messageVec").innerText ===
            "vehicle added successfully"
          ) {
            document.getElementById("licenseLetters").value = "";
            document.getElementById("licenseNumbers").value = "";
            document.getElementById("type").value = "";
            document.getElementById("model").value = "";
            document.getElementById("endOfLicense").value = "";
            document.getElementById("beginningOfLicense").value = "";
            setTimeout(() => {
              document.querySelector(".messageVec").innerText = "";
            }, 3000);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
}

// delet vechicle

function deleteVehicle(id) {
  // يفترض أن الـ token مخزن في localStorage
  const token = JSON.parse(localStorage.getItem("token"));
  if (confirm('هل أنت متأكد أنك تريد حذف المركبة؟')) {
  fetch(`https://gara4ko.onrender.com/api/v1/vehicle/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      console.error("HTTP Error:", response.statusText);
      throw new Error("Something went wrong");
    }
  })
  .then((data) => {
    console.log("Vehicle deleted:", data);
    // يمكنك هنا إعادة تحميل البيانات أو تحديث الواجهة
    vicData()
  })
  .catch((error) => {
    console.error("Error:", error);
  });
}
}

