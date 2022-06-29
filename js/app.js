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
  let text = flightLocationLeft.innerHTML;
  flightLocationLeft.innerHTML = flightLocationRight.innerHTML;
  flightLocationRight.innerHTML = text;
});

// inputChange
inputChange.addEventListener("click", () => {
  let value = inputFrom.value;
  inputFrom.value = inputTo.value;
  inputTo.value = value;
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
