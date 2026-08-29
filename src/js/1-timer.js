import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const date = new Date();

const inputEl = document.querySelector("#datetime-picker");
const buttonEl = document.querySelector("button");
const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");

buttonEl.disabled = true;

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] <= new Date()) {
        iziToast.error({message: "Please choose a date in the future"});
        buttonEl.disabled = true;
    } else {
        userSelectedDate = selectedDates[0];
        buttonEl.disabled = false;
    }
  },
};

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

flatpickr(inputEl, options);

buttonEl.addEventListener("click", () => {
    buttonEl.disabled = true;
    inputEl.disabled = true;
    const timerId = setInterval(() => {
        const now = new Date();
        const diff = userSelectedDate - now;        
        if (diff <= 0) {
            clearInterval(timerId);
            inputEl.disabled = false;
            return;
        }
        const time = convertMs(diff);
        daysEl.textContent = addLeadingZero(time.days);
        hoursEl.textContent = addLeadingZero(time.hours);
        minutesEl.textContent = addLeadingZero(time.minutes);
        secondsEl.textContent = addLeadingZero(time.seconds);
    }, 1000)
});


