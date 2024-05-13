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

/*
addd event on all elements for toggling navbar
*/
for (let i = 0; i < navElemArr.length; i++) {
  navElemArr[i].addEventListener("click", function () {
    elemToggleFunc(navbar);
    elemToggleFunc(overlay);
  });
}

let imgProf = document.querySelector(".ul-icon-img");
let saerchform = document.querySelector(".search-form");
let shoppingCart = document.querySelector(".shopping-cart");
let servList = document.querySelector(".listOfServ");

document.querySelector("#search-btn").onclick = () => {
  saerchform.classList.toggle("active");
  imgProf.classList.remove("active");

  shoppingCart.classList.remove("active");
  loginForm.classList.remove("active");
  navbar.classList.remove("active");
  servList.classList.remove("active");
};

document.querySelector("#cart-btn").onclick = () => {
  shoppingCart.classList.toggle("active");
  imgProf.classList.remove("active");
  saerchform.classList.remove("active");
  loginForm.classList.remove("active");
  navbar.classList.remove("active");
  servList.classList.remove("active");
};

document.querySelector(".prof-icon-div").onclick = () => {
  imgProf.classList.toggle("active");
  shoppingCart.classList.remove("active");
  saerchform.classList.remove("active");
  loginForm.classList.remove("active");
  navbar.classList.remove("active");
  servList.classList.remove("active");
};

document.querySelector(".serv-list").onclick = () => {
  servList.classList.toggle("active");
  shoppingCart.classList.remove("active");
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

let cart = document.querySelector(".shopping-cart");

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

/*
----------------------------
todo => Database Apis ^^
----------------------------
*/

// user data
function userData() {
  const token = JSON.parse(localStorage.getItem("token"));

  fetch("https://gara4ko-p8wm.onrender.com/api/v1/user/", {
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
      document.querySelector(
        ".name"
      ).innerHTML = `<pre>user name:</pre> ${data.data.userName}`;
      document.querySelector(".email").innerText = `email: ${data.data.email}`;
      document.querySelector(
        ".phone-user"
      ).innerText = `tel: ${data.data.phoneNumber}`;

      // acc form
      document.querySelector(".name #fName").value =
        data.data.userName.split(" ")[0];
      document.querySelector(".name  #lName").value =
        data.data.userName.split(" ")[1];
      document.querySelector(".email #uEmail").value = data.data.email;
      document.querySelector(".email #uTel").value = data.data.phoneNumber;
    })
    .catch((error) => console.error("Error:", error));
}

// Add vechicle
function vecAdd() {
  document
    .querySelector(".vec-creat")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      var licenseLetters = document.getElementById(
        "licenseLetters".trim()
      ).value;
      var licenseNumbers = document.getElementById(
        "licenseNumbers".trim()
      ).value;
      var type = document.getElementById("type".trim()).value;
      var model = document.getElementById("model".trim()).value;
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

      // التحقق من القيم قبل الإرسال
      if (
        !licenseLetters ||
        !licenseNumbers ||
        !type ||
        !model ||
        !endOfLicense ||
        !beginningOfLicense
      ) {
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: 'واحد أو أكثر من الحقول فارغة',
        });
        return;
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

      fetch("https://gara4ko-p8wm.onrender.com/api/v1/vehicle", {
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
          if (data.message === "vehicle added successfully") {
            Swal.fire({
              icon: 'success',
              title: 'تم بنجاح',
              text: 'تمت إضافة المركبة بنجاح',
            });
            document.getElementById("licenseLetters").value = "";
            document.getElementById("licenseNumbers").value = "";
            document.getElementById("type").value = "";
            document.getElementById("model").value = "";
            document.getElementById("endOfLicense").value = "";
            document.getElementById("beginningOfLicense").value = "";
          } else {
            Swal.fire({
              icon: 'error',
            title: 'error',
              text: data.message,
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'error',
            text: 'try again',
          });
          console.error("Error:", error);
        });
    });
}




// vec data
function vicData() {
  const token = JSON.parse(localStorage.getItem("token"));

  fetch(`https://gara4ko-p8wm.onrender.com/api/v1/vehicle/vehicles`, {
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

      for (let i = 0; i < data.data.length; i++) {
        const vehicle = data.data[i];
        if (vehicle && vehicle._id) {
          console.log("data loop", data.data[i]._id);

          box += `
            <tr class="item">
              <td>${i + 1}</td>
              <td>${vehicle.vehicle_info.type}</td>
              <td>${vehicle.vehicle_info.model}</td>
              <td>${vehicle.vehicle_license.licenseNumbers.join(" ")}</td>
              <td>${vehicle.vehicle_license.licenseLetters.join(" ")}</td>
              <td>
              <i class="fa-solid fa-pen-to-square" id="editIcon"  onclick="updateVehicle('${
                data.data[i]._id
              }')"></i>
              </td>
              <td>
              <i class="fa-solid fa-trash" onclick="deleteVehicle('${
                vehicle._id
              }')"></i></td>
            </tr>
            `;
        }
      }
      
      document.getElementById("vehiceRow").innerHTML = box;
      
      // console.log("data loop", vehicle._id);
      // console.log(data);
      // console.log(data.data[0]?.BeginningOfLicense);

      document.getElementById("typeE").value = data.data[0]?.vehicle_info.type;
      document.getElementById("modelE").value =
        data.data[0]?.vehicle_info.model;
      document.getElementById("licenseLettersE").value =
        data.data[0]?.vehicle_license.licenseLetters.join("");
      document.getElementById("licenseNumbersE").value =
        data.data[0]?.vehicle_license.licenseNumbers.join("");

      let dateEnd = new Date(data.data[0]?.endOfLicense)
        .toISOString()
        .slice(0, 10);
      document.getElementById("endOfLicenseE").value = dateEnd;

      let datebeginning = new Date(data.data[0]?.BeginningOfLicense)
        .toISOString()
        .slice(0, 10);
      document.getElementById("beginningOfLicenseE").value = datebeginning;
    })

    .catch((error) => console.error("Error:", error));
}


// edit vechle
// Function to update vehicle data
function updateVehicle(id) {
  console.log(id);
  const token = JSON.parse(localStorage.getItem("token"));
  const form = document.querySelector(".vec-update");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Collecting updated vehicle data from the form
    const updatedData = {
      licenseLetters: document
        .getElementById("licenseLettersE")
        .value.split(" "),
      licenseNumbers: document
        .getElementById("licenseNumbersE")
        .value.split("")
        .map(Number),
      type: document.getElementById("typeE").value,
      model: document.getElementById("modelE").value,
      endOfLicense: document.getElementById("endOfLicenseE").value,
      BeginningOfLicense: document.getElementById("beginningOfLicenseE").value,
    };

    // Sending the PUT request to update the vehicle data
    fetch(`https://gara4ko-p8wm.onrender.com/api/v1/vehicle/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(id);
        console.log(data);
        if (data.success) {
          document.querySelector(".messageVec").innerText = data.message;
          // Clear form fields after successful update
          form.reset();
          // Refresh vehicle data display
          vicData();
        } else {
          document.querySelector(".messageVec").innerText = "Update failed ";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        document.querySelector(".messageVec").innerText =
          "Update failed: " + error.message;
      });
  });
}





// Call this function when the edit icon is clicked, passing the vehicle ID

// delet vechicle
function deleteVehicle(id) {
  const token = JSON.parse(localStorage.getItem("token"));
  Swal.fire({
    title: "You'll Delete Vehicle ",
    imageUrl: "assets/images/logo.png", // استبدل هذا برابط الصورة الخاص بك
    imageHeight: 100,
    imageAlt: "صورة مخصصة",
    showCancelButton: true,
    confirmButtonText: "yes, delete",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`https://gara4ko-p8wm.onrender.com/api/v1/vehicle/${id}`, {
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
          vicData();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  });
}
