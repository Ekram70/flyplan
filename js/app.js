// getting all references

let currency = document.getElementById("currency");
let currencyList = document.getElementById("currency-list");
let currencyListItem = currencyList.querySelectorAll("a");
let activeCurrency = document.getElementById("active-currency");
let datePicker = document.querySelectorAll(".custom-date-picker");
let inputDropdown = document.querySelectorAll(".input-dropdown");
let flightChangeBtn = document.querySelector(".flight-btn button");
let flightLocationLeft = document.querySelector(".flight-location-left");
let flightLocationRight = document.querySelector(".flight-location-right");
let inputChange = document.querySelector(".input-to .icon");
let inputFrom = document.querySelector(".input-from input");
let inputTo = document.querySelector(".input-to input");
let filterToggleBtns = document.querySelectorAll(".filter-box .fa-chevron-up");
let travellingToggleBtns = document.querySelectorAll(".travelling-box .fa");
let mobileMenuIcon = document.querySelector(".mobile-menu .icon");
let desktopMenu = document.querySelector(".desktop-menu");
let filterBtn = document.getElementById("filter-btn");
let sidebarClose = document.querySelector(".summary-icon i");
let sidebar = document.querySelector(".sidebar");
let priceBtns = document.querySelectorAll(".price-btn");
let modalBox = document.querySelector(".modal-box");
let modalBoxClose = document.querySelector(".modal-box-close");
let detailsBtns = document.querySelectorAll(".details-tag span");
let flightLocationTo = document.getElementById("flight-location-to");
let flightLocationFrom = document.getElementById("flight-location-from");
let flightLocationToList = document.querySelector("#flight-location-to + ul");
let flightLocationFromList = document.querySelector(
  "#flight-location-from + ul"
);
let flightToSpan = document.querySelectorAll(".flight-to-span");
let flightFromSpan = document.querySelectorAll(".flight-from-span");
let flightDepartDate = document.getElementById("flight-depart-date");
let flightReturnDate = document.getElementById("flight-return-date");
let flightDepartDateSpan = document.getElementById("flight-depart-date-span");
let flightReturnDateSpan = document.getElementById("flight-return-date-span");
let inputPersonCount = document.querySelectorAll(".input-person-count");
let inputPersonCountSpan = document.querySelectorAll(
  ".input-person-count-span"
);
let dropdownChildrenList = document.querySelector(".dropdown-children-list");

// some useful data
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const daysInWeek = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

// sotring some data
let storeDate = new Date();

currency.addEventListener("click", () => {
  currencyList.classList.toggle("d-none");
});

currencyListItem.forEach((item) => {
  item.addEventListener("click", () => {
    currencyList.classList.add("d-none");
    activeCurrency.innerHTML = `<span>${item.innerText}</span>`;
  });
});

datePicker.forEach((picker) => {
  picker.addEventListener("click", (e) => {
    e.target.type = "date";
    e.target.showPicker();
  });
  picker.addEventListener("blur", (e) => {
    storeDate = new Date(e.target.value);
    const dateArr = e.target.value.split("-");
    const [year, month, date] = dateArr;
    e.target.type = "text";
    if (year) e.target.value = `${date}-${month}-${year}`;
  });
});

inputDropdown.forEach((dropdown) => {
  setOption(dropdown);
  dropdown.addEventListener("click", (e) => {
    // getting references
    let parent = e.target.parentElement.parentElement;
    let dropdownList = parent.querySelector(".dropdown-list");
    let options = parent.querySelector("select").children;
    let textInput = parent.querySelector("input");
    // clearing the list
    dropdownList.innerHTML = "";
    // creating the list
    for (let i = 0; i < options.length; i++) {
      let li = document.createElement("li");
      li.innerText = options[i].innerText;
      li.addEventListener("click", () => {
        textInput.value = `${li.innerText}`;
        let count = personCount();
        inputPersonCountSpan.forEach((span) => {
          span.innerText = `${count} travellers`;
        });
      });
      dropdownList.appendChild(li);
    }
    // toggling the list
    dropdownList.classList.toggle("d-none");
  });
});

function setOption(parent) {
  const options = parent.querySelector("select").children;
  const textInput = parent.querySelector("input");
  const target = options[0].innerText;
  textInput.placeholder = `${target}`;
}

// flight change btn
flightChangeBtn.addEventListener("click", () => {
  // do something
});

// inputChange
inputChange.addEventListener("click", () => {
  if (inputFrom.value && inputTo.value) {
    let value = inputFrom.value;
    inputFrom.value = inputTo.value;
    inputTo.value = value;

    flightFromSpan.forEach((span) => {
      span.innerText = inputFrom.value.split(",")[0];
    });

    flightToSpan.forEach((span) => {
      span.innerText = inputTo.value.split(",")[0];
    });
  }
});

// toggleBtns
filterToggleBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let parent = e.target.parentElement.parentElement;
    let element = parent.querySelector(".filter-box-content");
    toggle(element);
    e.target.classList.toggle("rotate-180");
  });
});

travellingToggleBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let parent = e.target.parentElement.parentElement;
    let element = parent.querySelector(".travelling-box-form");
    toggle(element);
    e.target.classList.toggle("rotate-180");
  });
});

// toggle function
function toggle(element) {
  element.classList.toggle("d-none");
}

// menu toggling
mobileMenuIcon.addEventListener("click", () => {
  desktopMenu.classList.toggle("d-block");
});

// mobile filter
filterBtn.addEventListener("click", (e) => {
  let parent = e.target.parentElement.parentElement;
  let target = parent.querySelector(".filter");
  target.classList.toggle("d-block");
});

// summary section toggle
sidebarClose.addEventListener("click", () => {
  sidebar.style.right = "-270px";
});

priceBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    sidebar.style.right = "0";
  });
});

// modal box
detailsBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    modalBox.classList.remove("d-none");
  });
});

modalBoxClose.addEventListener("click", () => {
  modalBox.classList.add("d-none");
});

// flight location change
flightLocationTo.addEventListener("input", (e) => {
  flightLocationToList.innerHTML = "";
  fetch("../js/db/airportlist.json")
    .then((res) => res.json())
    .then((data) => {
      let result = data.filter((port) =>
        port.name.toLowerCase().includes(`${e.target.value.toLowerCase()}`)
      );
      if (result.length > 5) result.length = 5;
      if (result.length > 0) {
        for (let i = 0; i < result.length; i++) {
          let li = document.createElement("li");
          li.innerText = result[i].name;
          li.addEventListener("click", (e) => {
            flightLocationTo.value = e.target.innerText;
            flightLocationToList.classList.add("d-none");
            flightToSpan.forEach((btn) => {
              btn.innerHTML = flightLocationTo.value.split(",")[0];
            });
          });
          flightLocationToList.appendChild(li);
          flightLocationToList.classList.remove("d-none");
        }
      } else {
        flightLocationToList.classList.add("d-none");
      }
    });
});

flightLocationFrom.addEventListener("input", (e) => {
  flightLocationFromList.innerHTML = "";
  fetch("../js/db/airportlist.json")
    .then((res) => res.json())
    .then((data) => {
      let result = data.filter((port) =>
        port.name.toLowerCase().includes(`${e.target.value.toLowerCase()}`)
      );
      if (result.length > 5) result.length = 5;
      if (result.length > 0) {
        for (let i = 0; i < result.length; i++) {
          let li = document.createElement("li");
          li.innerText = result[i].name;
          li.addEventListener("click", (e) => {
            flightLocationFrom.value = e.target.innerText;
            flightLocationFromList.classList.add("d-none");
            flightFromSpan.forEach((btn) => {
              btn.innerHTML = flightLocationFrom.value.split(",")[0];
            });
          });
          flightLocationFromList.appendChild(li);
          flightLocationFromList.classList.remove("d-none");
        }
      } else {
        flightLocationFromList.classList.add("d-none");
      }
    });
});

// flight date change

flightDepartDate.addEventListener("blur", () => {
  const day = daysInWeek[storeDate.getDay()];
  const month = months[storeDate.getMonth()];
  const date = storeDate.getDate();
  flightDepartDateSpan.innerText = `${date} ${month}, ${day}`;
});

flightReturnDate.addEventListener("blur", () => {
  const day = daysInWeek[storeDate.getDay()];
  const month = months[storeDate.getMonth()];
  const date = storeDate.getDate();
  flightReturnDateSpan.innerText = `${date} ${month}, ${day}`;
});

// person count
function personCount() {
  let count = 0;
  inputPersonCount.forEach((person) => {
    if (+person.value.split("")[0]) {
      count += +person.value.split("")[0];
    }
  });
  return count;
}

// multi-range slider
var lowerSlider = document.querySelector("#lower"),
  upperSlider = document.querySelector("#upper"),
  lowerVal = parseInt(lowerSlider.value);
upperVal = parseInt(upperSlider.value);

upperSlider.oninput = function () {
  lowerVal = parseInt(lowerSlider.value);
  upperVal = parseInt(upperSlider.value);

  if (upperVal < lowerVal + 5) {
    lowerSlider.value = upperVal - 5;

    if (lowerVal == lowerSlider.min) {
      upperSlider.value = 5;
    }
  }
};

lowerSlider.oninput = function () {
  lowerVal = parseInt(lowerSlider.value);
  upperVal = parseInt(upperSlider.value);

  if (lowerVal > upperVal - 5) {
    upperSlider.value = lowerVal + 5;

    if (upperVal == upperSlider.max) {
      lowerSlider.value = parseInt(upperSlider.max) - 5;
    }
  }
};
