


// ---------------------popup js ---------

const monthYear = document.getElementById("monthYear");
const daysGrid = document.getElementById("daysGrid");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");
const dateInput = document.getElementById("dateInput");
const popup = document.getElementById("popup");
const popupBtn = document.getElementById("popup_btn");
const callbackBtn = document.getElementById("call_back_btn");
const callbackBtnMbl = document.querySelectorAll(".call_back_btn_mbl");
const dateTimePicker = document.getElementById("date_time_picker");
const modalContact = document.getElementById("modal_contact");
const modalNextBtn = document.getElementById("modalNextBtn");
const modalFooter = document.getElementById("modal_footer");
const timeOptionsSelected = document.getElementById("time_selection_option");
let select = document.getElementById("selectedTime");

let currentDate = new Date();
let selectedDate = null;
let activeButton = null;
let activeDate = null;
let selectedTime = null;

let isTimeDateSelected = false;

const errorMessage = document.createElement("p");
errorMessage.id = "error-message";
errorMessage.style.color = "red";
errorMessage.style.textAlign = "center";
errorMessage.style.marginTop = "10px";
modalFooter.insertBefore(errorMessage, modalFooter.firstChild);

timeOptionsSelected.addEventListener("click", () => {
  let selectedIndex = timeOptionsSelected.selectedIndex;
  selectedTime = timeOptionsSelected.options[selectedIndex].text;
  // console.log('Time :'+selectedTime);

  
  if (selectedDate) {
    const options = { weekday: "long", day: "numeric", month: "long" };
    dateInput.value = selectedDate.toLocaleDateString("en-US", options);
    select.value = `${dateInput.value}, ${selectedTime}`;
    // console.log(`Date : ${dateInput.value}, ${selectedTime}`);
    
  } else {
    dateInput.value = "";
  }
  updateError();

});

function updateError() {
  if (selectedDate && selectedTime) {
    errorMessage.style.display = "none";
    modalNextBtn.style.opacity = "1";
    modalNextBtn.style.pointerEvents = "auto";
    select.style.display = "block";
    return true;
  } else {
    errorMessage.style.display = "block";
    errorMessage.textContent = "Select Both Date and Time";
    modalNextBtn.style.opacity = "0.5";
    modalNextBtn.style.pointerEvents = "none";
    select.style.display = "none";
    return false;
  }
}

callbackBtn.addEventListener("click", () => {
  popup.classList.toggle("active");
  dateTimePicker.classList.toggle("active");
  dateTimePicker.classList.toggle("active");
  updateError();
});


callbackBtnMbl.forEach((e)=>{
  e.addEventListener("click", () => {
    popup.classList.toggle("active");
    dateTimePicker.classList.toggle("active");
    dateTimePicker.classList.toggle("active");
    updateError();

})
})

// console.log(select.value);

select.value = currentDate.toDateString();

popupBtn.addEventListener("click", () => {
  popup.classList.toggle("active");
  dateTimePicker.classList.add("active");
  modalContact.classList.remove("active");
  modalFooter.classList.remove("active");
  if (!popup.classList.contains("active")) {
    select.value = "";
    selectedDate = null;
    selectedTime = null;
    dateInput.value = "";
    activeButton.classList.remove("active");
    activeDate.classList.remove("selected");
    selectedTime = null;
  }
});

modalNextBtn.addEventListener("click", () => {
  dateTimePicker.classList.remove("active");
  modalContact.classList.add("active");
  modalFooter.classList.add("active");
});

function updateCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  monthYear.textContent = `${currentDate.toLocaleString("default", {
    month: "long",
  })} ${year}`;

  daysGrid.innerHTML = "";

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const startingDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

  for (let i = 0; i < 42; i++) {
    const dayButton = document.createElement("button");
    const currentDay = new Date(year, month, i - startingDay + 1);

    dayButton.textContent = currentDay.getDate();

    if (i < startingDay || currentDay > lastDay) {
      dayButton.classList.add("other-month");
    }

    if (currentDay.toDateString() === new Date().toDateString()) {
      dayButton.classList.add("today");
    }

    if (
      selectedDate &&
      currentDay.toDateString() === selectedDate.toDateString()
    ) {
      dayButton.classList.add("selected");

      activeDate = dayButton;
    }

    dayButton.addEventListener("click", () => {
      selectedDate = currentDay;
      updateCalendar();
      updateDateInput();
    });

    daysGrid.appendChild(dayButton);
  }
}

function updateDateInput() {
  if (selectedDate) {
    const options = { weekday: "long", day: "numeric", month: "long" };
    dateInput.value = selectedDate.toLocaleDateString("en-US", options);
    select.value = `${dateInput.value}`;
    // console.log(`Date : ${dateInput.value} ${selectedTime}`);
    
  } else {
    dateInput.value = "";
  }
  updateError();
}

prevMonthBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  updateCalendar();
});

nextMonthBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  updateCalendar();
});

updateCalendar();
updateDateInput();


// ---------time slote ----------

let btn = document.querySelectorAll(".time-container span");

btn.forEach((node) => {
  node.addEventListener("click", () => {
    //  node.classList.add("active");
    if (dateInput.value !== "") {
      selectedTime = node.innerHTML;
      select.value = `${dateInput.value}, ${node.innerHTML}`;
    }

    if (activeButton) {
      activeButton.classList.remove("active");
    }

    // Add active class to the clicked button
    if (node.innerHTML) {
      node.classList.add("active");
    }

    // Update the activeButton reference
    activeButton = node;
    updateError();
  });
});
