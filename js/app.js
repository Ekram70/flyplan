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
let roundTrip = document.getElementById("round-trip");
let oneWay = document.getElementById("one-way");
let flightDepart = document.querySelector(".flight-depart");
let flightReturn = document.querySelector(".flight-return");
let priceAmountLeft = document.querySelector(".price-amount-left");
let priceAmountRight = document.querySelector(".price-amount-right");
let upper = document.getElementById("upper");
let lower = document.getElementById("lower");
let departBtns = document.querySelectorAll(".depart-btn");
let stopsBtns = document.querySelectorAll(".stops-btn");
let honorificBtns = document.querySelectorAll(".honorific-btn");

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

// storing some data
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
    let options = parent.children[parent.children.length - 1].children;
    let textInput = parent.querySelector("input");
    // clearing the list
    dropdownList.innerHTML = "";
    console.log(parent);
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

flightDepartDate.setAttribute("min", `${currentDate()}`);

flightDepartDate.addEventListener("blur", () => {
  const day = daysInWeek[storeDate.getDay()];
  const month = months[storeDate.getMonth()];
  const date = storeDate.getDate();
  flightDepartDateSpan.innerText = `${date} ${month}, ${day}`;
  const setDate = flightDepartDate.value.split("-");
  flightReturnDate.setAttribute(
    "min",
    `${setDate[2]}-${setDate[1]}-${setDate[0]}`
  );
});

flightReturnDate.addEventListener("blur", () => {
  const day = daysInWeek[storeDate.getDay()];
  const month = months[storeDate.getMonth()];
  const date = storeDate.getDate();
  flightReturnDateSpan.innerText = `${date} ${month}, ${day}`;
});

flightReturnDate.addEventListener("click", () => {
  roundTrip.click();
});

function currentDate() {
  let date = new Date();
  let currentYear = date.getFullYear();
  let currentMonth = date.getMonth() + 1;
  let currentDate = date.getDate();

  currentMonth =
    `${currentMonth}`.length == 1 ? `0${currentMonth}` : `${currentMonth}`;
  currentDate =
    `${currentDate}`.length == 1 ? `0${currentDate}` : `${currentDate}`;

  return `${currentYear}-${currentMonth}-${currentDate}`;
}

function nextDate() {
  let date = new Date(flightDepartDate.getAttribute("min"));
  date.setDate(date.getDate() + 1);
  let currentYear = date.getFullYear();
  let currentMonth = date.getMonth() + 1;
  let currentDate = date.getDate();

  currentMonth =
    `${currentMonth}`.length == 1 ? `0${currentMonth}` : `${currentMonth}`;
  currentDate =
    `${currentDate}`.length == 1 ? `0${currentDate}` : `${currentDate}`;

  return `${currentYear}-${currentMonth}-${currentDate}`;
}

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

// one way , round trip
flightReturn.classList.add("d-none");
oneWay.addEventListener("click", () => {
  flightReturnDate.value = "";
  flightReturn.classList.add("d-none");
});

roundTrip.addEventListener("click", () => {
  flightReturnDate.disabled = false;
  flightReturn.classList.remove("d-none");
});

// price range
lower.addEventListener("input", (e) => {
  priceAmountLeft.innerText = `$${e.target.value}`;
});

upper.addEventListener("input", (e) => {
  priceAmountRight.innerText = `$${e.target.value}`;
});

// departBtns
departBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    for (let i = 0; i < departBtns.length; i++) {
      departBtns[i].classList.remove("active");
    }
    btn.classList.add("active");
  });
});

// stops Btns
stopsBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    for (let i = 0; i < stopsBtns.length; i++) {
      stopsBtns[i].classList.remove("active");
    }
    btn.classList.add("active");
  });
});

// honorificBtns
honorificBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    for (let i = 0; i < honorificBtns.length; i++) {
      honorificBtns[i].classList.remove("active");
    }
    btn.classList.add("active");
  });
});

// multi-range slider
var lowerSlider = document.querySelector("#lower"),
  upperSlider = document.querySelector("#upper"),
  lowerVal = parseInt(lowerSlider.value);
upperVal = parseInt(upperSlider.value);

upperSlider.oninput = function () {
  lowerVal = parseInt(lowerSlider.value);
  upperVal = parseInt(upperSlider.value);

  if (upperVal < lowerVal + 500) {
    lowerSlider.value = upperVal - 500;
    priceAmountLeft.innerText = `$${lowerSlider.value}`;

    if (lowerVal == lowerSlider.min) {
      upperSlider.value = 500;
      priceAmountRight.innerText = `$${upperSlider.value}`;
    }
  }
};

lowerSlider.oninput = function () {
  lowerVal = parseInt(lowerSlider.value);
  upperVal = parseInt(upperSlider.value);

  if (lowerVal > upperVal - 500) {
    upperSlider.value = lowerVal + 500;
    priceAmountRight.innerText = `$${upperSlider.value}`;

    if (upperVal == upperSlider.max) {
      lowerSlider.value = parseInt(upperSlider.max) - 500;
      priceAmountLeft.innerText = `$${lowerSlider.value}`;
    }
  }
};
