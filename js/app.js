// getting all references

let currency = document.getElementById("currency");
let currencyList = document.getElementById("currency-list");
let currencyListItem = currencyList.querySelectorAll("a");
let activeCurrency = document.getElementById("active-currency");
let datePicker = document.querySelectorAll(".custom-date-picker");
let inputDropdown = document.querySelectorAll(".input-dropdown");

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
