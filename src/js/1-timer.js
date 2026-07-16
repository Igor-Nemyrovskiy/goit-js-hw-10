import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const dateInput = document.querySelector("#datetime-picker");
const startButton = document.querySelector("[data-start]");
const daysElement = document.querySelector("[data-days]");
const hoursElement = document.querySelector("[data-hours]");
const minutesElement = document.querySelector("[data-minutes]");
const secondsElement = document.querySelector("[data-seconds]");

let userSelectedDate = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  disableMobile: true,

  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (!selectedDate) {
      return;
    }

    if (selectedDate <= new Date()) {
      userSelectedDate = null;
      startButton.disabled = true;

        iziToast.error({
        title: "Error",
        message: "Please choose a date in the future",
        position: "topRight",
      });

      return;
    }

    userSelectedDate = selectedDate;
    startButton.disabled = false;
  },
};

flatpickr(dateInput, options);

startButton.addEventListener("click", handleStart);

function handleStart() {
  startButton.disabled = true;
  dateInput.disabled = true;

  updateTimer();

  intervalId = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const remainingTime = userSelectedDate - new Date();

  if (remainingTime <= 0) {
    clearInterval(intervalId);

    updateInterface({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });

    dateInput.disabled = false;
    startButton.disabled = true;
    userSelectedDate = null;

    return;
  }

  const time = convertMs(remainingTime);

  updateInterface(time);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

function updateInterface({ days, hours, minutes, seconds }) {
  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}