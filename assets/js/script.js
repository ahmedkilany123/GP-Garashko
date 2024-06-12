let token = JSON.parse(localStorage.getItem("token"));

const api = "https://gara4ko.onrender.com";
// let api = "http://localhost:3000";
// clickables();
toggle();

// Define the scroll handler function
function myScrollHandler() {
  window.addEventListener("scroll", myScrollHandler, { passive: true });
}

// Add the event listener
window.addEventListener("scroll", myScrollHandler, { passive: true });

function toggle() {
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

  const elemToggleFunc = function (elem) {
    elem.classList.toggle("active");
  };
  /*
  addd event on all elements for toggling navbar
  */
  for (let i = 0; i < navElemArr.length; i++) {
    navElemArr[i].addEventListener("click", function () {
      elemToggleFunc(navbar);
      elemToggleFunc(overlay);
    });
  }

  // // download app
  // document.addEventListener("DOMContentLoaded", function () {
  //   const mediaQuery = window.matchMedia("(min-width: 768px)");
  //   if (mediaQuery.matches) {
  //     alert("Media Query Matched!");
  //   }
  // });

  // if (window.matchMedia("(max-width: 991px)").matches) {

  // }

  /**
   * header active state
   */

  const header = document.querySelector("[data-header]");

  window.addEventListener("scroll", function () {
    window.scrollY >= 400
      ? header.classList.add("active")
      : header.classList.remove("active");
  });
}

//todo cokies

function accCokies() {
  const cookieConsent = document.getElementById("cookie-consent");

  // Check stored consent status
  const cookieConsentStatus = localStorage.getItem("cookieConsent");
  if (cookieConsentStatus) {
    cookieConsent.style.display = "none";
  }

  localStorage.setItem("cookieConsent", "accepted");
  cookieConsent.style.display = "none";
  // Logic to handle accepting cookies
  console.log("Cookies accepted");
}

function desCokies() {
  localStorage.setItem("cookieConsent", "declined");
  cookieConsent.style.display = "none";
  // Logic to handle declining cookies
  console.log("Cookies declined");
}
//todo cokies

function cartTrash() {
  const trashIcons = document.querySelectorAll(".fa-trash");
  const total = document.querySelector(".total");
  let totalAmount = 100;

  trashIcons.forEach((icon) => {
    icon.addEventListener("click", function () {
      const box = this.closest(".box");
      if (box) {
        const priceElement = box.querySelector(".price");
        if (priceElement) {
          const price = parseFloat(priceElement.textContent);
          totalAmount -= price;
          total.textContent = totalAmount + " Egp";
          box.remove();
        }
      }
    });
  });
}

function searchBtn() {
  let imgProf = document.querySelector(".ul-icon-img");
  let saerchform = document.querySelector(".search-form");
  let shoppingCart = document.querySelector(".shopping-cart");
  let servList = document.querySelector(".listOfServ");

  saerchform.classList.toggle("active");
  imgProf.classList.remove("active");

  shoppingCart.classList.remove("active");
  servList.classList.remove("active");
}
function cartShow() {
  let imgProf = document.querySelector(".ul-icon-img");
  let saerchform = document.querySelector(".search-form");
  let shoppingCart = document.querySelector(".shopping-cart");
  let servList = document.querySelector(".listOfServ");

  saerchform.classList.remove("active");
  imgProf.classList.remove("active");

  shoppingCart.classList.toggle("active");
  servList.classList.remove("active");
}
function profList() {
  let imgProf = document.querySelector(".ul-icon-img");
  let saerchform = document.querySelector(".search-form");
  let shoppingCart = document.querySelector(".shopping-cart");
  let servList = document.querySelector(".listOfServ");

  imgProf.classList.toggle("active");
  shoppingCart.classList.remove("active");
  saerchform.classList.remove("active");
  servList.classList.remove("active");
}

function servHeadList() {
  document.querySelector(".listOfServ").classList.toggle("show");
}

/**
 * login page
 */
function accBtn() {
  document.querySelector(".modal").classList.toggle("hide");
  document.querySelector(".login").classList.toggle("blur");
}

function btnLog() {
  let logForm = document.querySelector("section.login .form-login");
  let creatForm = document.querySelector("section.login .form-creat");
  creatForm.style.display = "none";
  logForm.style.display = "block";
}

function btnCreat() {
  let logForm = document.querySelector("section.login .form-login");
  let creatForm = document.querySelector("section.login .form-creat");
  logForm.style.display = "none";
  creatForm.style.display = "block";
}
/*
----------------------------
todo => Database Apis ^^
----------------------------
*/

// async function deleteAccount(userId) {
//   const apiUrl = "http://localhost:3000/api/v1/auth/";
//   const deleteUrl = `${apiUrl}${userId}`;

//   try {
//     const response = await fetch(deleteUrl, {
//       method: "DELETE",
//       // You can add any necessary headers here (e.g., authentication tokens).
//     });

//     if (response.status === 200) {
//       console.log("User account deleted successfully.");
//     } else {
//       console.error("Error deleting user account:", response.statusText);
//     }
//   } catch (error) {
//     console.error("An error occurred while deleting the user account:", error);
//   }
// }

// Example usage:
//todo

// user data
function userData() {
  fetch(`${api}/api/v1/user/`, {
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

function editUser() {
  document
    .getElementById("edit-form-user")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const userName = document.getElementById("nameEdit").value;
      const phoneNumber = document.getElementById("phoneEdit").value;

      fetch(`${api}/api/v1/auth`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber,
          userName: userName,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          swal("تم تعديل بيانات المستخدم بنجاح!", {
            icon: "success",
          });
        })
        .catch((error) => {
          console.error("Error:", error);
          swal("حدث خطأ أثناء تعديل بيانات المستخدم!", {
            icon: "error",
          });
        });
    });
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

      if (
        !licenseLetters ||
        !licenseNumbers ||
        !type ||
        !model ||
        !endOfLicense ||
        !beginningOfLicense
      ) {
        Swal.fire({
          icon: "error",
          title: "error",
          text: "one or more field is impty",
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

      fetch(`${api}/api/v1/vehicle`, {
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
              icon: "success",
              title: "success",
              text: "vehicle added successfully",
            });
            document.getElementById("licenseLetters").value = "";
            document.getElementById("licenseNumbers").value = "";
            document.getElementById("type").value = "";
            document.getElementById("model").value = "";
            document.getElementById("endOfLicense").value = "";
            document.getElementById("beginningOfLicense").value = "";
          } else {
            Swal.fire({
              icon: "error",
              title: "error",
              text: data.error,
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "error",
            text: data,
          });
          console.error("Error:", data.error);
        });
    });
}

// vec data
function vicData() {
  fetch(`${api}/api/v1/vehicle/vehicles`, {
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
          

           <i class="fa-solid fa-pen-to-square" id="editIcon" class="vec-update" onclick="updateVehicle('${
             vehicle._id
           }')"
></i>


              </td>
              <td>
              <i class="fa-solid fa-trash" onclick="deleteVehicle('${
                vehicle._id
              }')"></i></td>
            </tr>
            `;

          // fill form edit
          document.getElementById("typeE").value = vehicle.vehicle_info.type;
          document.getElementById("modelE").value = vehicle.vehicle_info.model;
          document.getElementById("licenseLettersE").value =
            vehicle.vehicle_license.licenseLetters.join("");
          document.getElementById("licenseNumbersE").value =
            vehicle.vehicle_license.licenseNumbers.join("");

          let dateEnd = new Date(vehicle.endOfLicense)
            .toISOString()
            .slice(0, 10);
          document.getElementById("endOfLicenseE").value = dateEnd;

          let datebeginning = new Date(vehicle.BeginningOfLicense)
            .toISOString()
            .slice(0, 10);
          document.getElementById("beginningOfLicenseE").value = datebeginning;
        }
      }

      document.getElementById("vehiceRow").innerHTML = box;
    })
    .catch((error) => console.error("Error:", error));
}

function updateVehicle(id) {
  console.log(id); //test

  const form = document.querySelector(".vec-update");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

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

    fetch(`${api}/api/v1/vehicle/${id}`, {
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
          form.reset();
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
  console.log(id);
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
      fetch(`${api}/api/v1/vehicle/${id}`, {
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

function ParkingData() {
  const gridBoxes = document.querySelector(".grid-boxes");

  fetch(`${api}/api/v1/parking`, {
    method: "GET",
    headers: {
      token: token,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      for (let i = 0; i < data.data.length; i++) {
        const parking = data.data[i];

        const box = document.createElement("div");
        box.className = "box";

        box.innerHTML = `
              <img src="https://i.ibb.co/kx7BNHB/service-1.png" alt="">
  <h3 class="parkName">${parking.parking_name}</h3>
  <p class="location"><span class="city">${parking.location.city}</span>${
          parking.location.address
        }</p>
  <p class="cridPrice"> ${
    parking.creditPointPerHour
  } <span class="crid">credit points per hour</span></p>
  <p class="cridPrice"> ${
    parking.creditPointPerMonth
  } <span class="crid">credit points per month</span></p>
  <p class="rating">${getStars(parking.rate)} <span class="crid"></span></p>
  <p class="cridPrice"> ${
    parking.remainingSpace
  } <span class="crid">remaining Space</span></p>
    <div class="btns">
      <a href="single_park.html?id=${parking._id}" class="btn">ticket now</a>
    </div>
  `;

        gridBoxes.appendChild(box);
      }
    })
    .catch((error) => console.error("Error:", error));
}

function getStars(rating) {
  // تحويل التقييم إلى عدد صحيح
  rating = Math.round(rating);

  let stars = "";
  // إضافة نجمة صلبة لكل نقطة تقييم
  for (let i = 0; i < rating; i++) {
    stars += '<i class="fas fa-star y-star"></i>';
  }
  // إضافة نجمة فارغة للنقاط المتبقية
  for (let i = 0; i < 5 - rating; i++) {
    stars += '<i class="far fa-star d-star"></i>';
  }
  return stars;
}

let currentStepIndex = 0;
let userLocation;
let map, userMarker, directionsService, directionsRenderer;
let steps;

function initMap() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  console.log("Parking ID:", id);

  const gridBoxes = document.querySelector(".grid-boxes");

  fetch(`${api}/api/v1/parking/${id}`, {
    method: "GET",
    headers: {
      token: token,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      const parking = data.data;

      console.log("Parking Data:", parking);

      const box = document.createElement("div");
      box.className = "box";

      box.innerHTML = `
   


      <h3 class="parkName">${parking.parking_name}</h3>
      <div class="gridSingle" >
      
      
        <div class="headBox">
                <img src="https://i.ibb.co/kx7BNHB/service-1.png" alt="">
              </div>
              <div>
                  <p class="location"><span class="city">${
                    parking.location.city
                  }</span>${parking.location.address}</p>
                  <p class="cridPrice">${
                    parking.creditPointPerHour
                  } <span class="crid">credit points per hour</span></p>
                  <p class="cridPrice">${
                    parking.creditPointPerMonth
                  } <span class="crid">credit points per month</span></p>
                  <p class="rating">${getStars(
                    parking.rate
                  )} <span class="crid"></span></p>
                  <p class="cridPrice">${
                    parking.remainingSpace
                  } <span class="crid">remaining Space</span></p>
                  </div>
          </div>

          <div class="btns">
            <a href="#" class="btn" id="findInMap">find in map</a>
            <a href="#" class="btn" onclick="reserveParking('${
              parking._id
            }')">book now</a>
          </div>

          <form class="reserveation">
          <label for="pay">payment_method</label>
          <br/>
          <br/>

          <select name="pay" id="pay">
            <option value="volvo">Cash</option>
            <option value="saab">Credit Point</option>
            <option value="mercedes">Paymob</option>
            <option value="audi">Stripe</option>
          </select>
            <br/>
            <br/>
          <label for="quan">hours</label>
          <input type="number" name="quan" id="quan" />

          <a href="#" class="btn" onclick="reserveParking('${
            parking._id
          }')">book now</a>
      </form>
      `;

      gridBoxes.appendChild(box);

      const mapElement = document.getElementById("map");
      if (!mapElement) {
        console.error("Map element not found");
        return;
      }

      map = new google.maps.Map(mapElement, {
        center: {
          lat: parking.locationMap.coordinates[0],
          lng: parking.locationMap.coordinates[1],
        },
        zoom: 13,
      });

      var marker = new google.maps.Marker({
        position: {
          lat: parking.locationMap.coordinates[0],
          lng: parking.locationMap.coordinates[1],
        },
        map: map,
      });

      directionsService = new google.maps.DirectionsService();
      directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);

      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          (position) => {
            userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            if (userMarker) {
              userMarker.setPosition(userLocation);
            } else {
              userMarker = new google.maps.Marker({
                position: userLocation,
                map: map,
                title: "Your Location",
                icon: {
                  url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                },
              });
            }

            var bounds = new google.maps.LatLngBounds();
            bounds.extend(userLocation);
            bounds.extend(marker.getPosition());
            map.fitBounds(bounds);

            if (steps && steps[currentStepIndex]) {
              checkProximity(steps[currentStepIndex]);
            }
          },
          () => {
            console.error("Error getting user's location");
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }

      document.getElementById("getDirections").addEventListener("click", () => {
        if (!userLocation) {
          alert("Unable to get your location");
          return;
        }

        var request = {
          origin: userLocation,
          destination: {
            lat: parking.locationMap.coordinates[0],
            lng: parking.locationMap.coordinates[1],
          },
          travelMode: "DRIVING",
        };

        directionsService.route(request, (result, status) => {
          if (status === "OK") {
            directionsRenderer.setDirections(result);
            steps = result.routes[0].legs[0].steps;
            currentStepIndex = 0;
            readCurrentStep();
          } else {
            alert("فشل طلب الاتجاهات بسبب " + status);
          }
        });
      });

      document.getElementById("findInMap").addEventListener("click", () => {
        calculateAndDisplayRoute();
      });
    })
    .catch((error) => console.error("Error:", error));
}

function reservshow() {
  document.querySelector(".reserveation").classList.toggle(".show");
}

function getStars(rating) {
  rating = Math.round(rating);
  let stars = "";
  for (let i = 0; i < rating; i++) {
    stars += '<i class="fas fa-star y-star"></i>';
  }
  for (let i = 0; i < 5 - rating; i++) {
    stars += '<i class="far fa-star d-star"></i>';
  }
  return stars;
}

function readCurrentStep() {
  if (currentStepIndex < steps.length) {
    const step = steps[currentStepIndex];
    const utterance = new SpeechSynthesisUtterance(step.instructions);
    utterance.lang = "en-us";
    speechSynthesis.speak(utterance);
  }
}

function checkProximity(step) {
  const stepLocation = step.end_location;
  const distance = google.maps.geometry.spherical.computeDistanceBetween(
    new google.maps.LatLng(userLocation.lat, userLocation.lng),
    stepLocation
  );

  if (distance < 50) {
    currentStepIndex++;
    readCurrentStep();
  }
}

function calculateAndDisplayRoute() {
  if (!userLocation) {
    alert("Unable to get your location");
    return;
  }

  var service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins: [userLocation],
      destinations: [
        {
          lat: parking.locationMap.coordinates[0],
          lng: parking.locationMap.coordinates[1],
        },
      ],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidTolls: true,
      avoidHighways: false,
      avoidFerries: true,
    },
    (response, status) => {
      if (status !== "OK") {
        alert("Error was: " + status);
      } else {
        var originList = response.originAddresses;
        var destinationList = response.destinationAddresses;
        var outputDiv = document.getElementById("output");
        outputDiv.innerHTML = "";
        var showGeocodedAddressOnMap = function (asDestination) {
          var results = response.rows[0].elements;
          map.fitBounds(
            bounds.extend(userLocation).extend(marker.getPosition())
          );
          for (var j = 0; j < results.length; j++) {
            outputDiv.innerHTML +=
              originList[0] +
              " to " +
              destinationList[j] +
              ": " +
              results[j].distance.text +
              " in " +
              results[j].duration.text +
              "<br>";
          }
        };
        showGeocodedAddressOnMap(true);
      }
    }
  );
}

//-----------------
function walletTotal() {
  fetch(`${api}/api/v1/wallet/user`, {
    method: "GET",
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      if (data.success) {
        const total = data.data.total;
        document.getElementById("wallet-total").textContent = total;
      } else {
        console.error("Error fetching wallet details:", data.message);
      }
    })
    .catch((error) => console.error("Fetch error:", error));
}
//-----------------

function reserveParking(id) {
  let data = {
    paymentMethod: "Cash ", // todo *******selector******************************************************************************************************
    quantity: 1, // todo ********selector*****************************************************************************************************
    isHour: true,
    isMonth: false,
    // fromDate: "2024-06-28 08:10",
    // toDate: "2024-09-08 08:10",
    // vehicle: "65dfb840b76e4ed36d65dabe", // todo =>
  };

  fetch(`${api}/api/v1/reservation/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      swal("done!", "تم حجز الجراج بنجاح", "success");
      console.log(data);
      console.log(id);
    })
    .catch((error) => {
      console.error("Error:", error);
      console.log(data);
      swal("error", "حدث خطأ أثناء حجز الجراج", "error");
    });
}

//************************************ */
const ansSup = document.querySelector("#ansSup");

ansSup.style.display = "none"; // Hide the element if no input value

const supportedBtn = document.querySelector("#supported");
supportedBtn.addEventListener("submit", async (e) => {
  e.preventDefault();

  const ansValue = document.querySelector("#ans").value;
  const ansSup = document.querySelector("#ansSup");

  const data = {
    data: ansValue,
  };

  console.log(ansValue);

  if (ansValue) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/support?data=${encodeURIComponent(
          ansValue
        )}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      if (result && result.data) {
        const formattedText = formatResponse(result.data);
        ansSup.innerHTML = formattedText;
        ansSup.style.display = "block"; // Show the element
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    ansSup.style.display = "none"; // Hide the element if no input value
  }
});

function formatResponse(text) {
  // إزالة النجوم واستبدالها بعناصر HTML
  return text
    .replace(/\*\*/g, "<b>")
    .replace(/\*/g, "")
    .replace(/(?:\r\n|\r|\n)/g, "<br>");
}
