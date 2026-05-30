import streats from "./streats-list.json" with { type: "json" };

const mySelect = document.querySelector("#mySelect");
const searchEl = document.querySelector("#search");
const weekDayEl = document.querySelector(".week-day");
const mainContentEl = document.querySelector(".main-content");
const currentDateEl = document.querySelector(".current-date");

const weekDayName = {
  pn: "poniedziałek",
  wt: "wtorek",
  sr: "środa",
  cz: "czwartek",
  pt: "piątek",
  sb: "sobota",
  nd: "niedziela",
};

const dayOfWeekCode = ["", "pn", "wt", "sr", "cz", "pt", "sb", "nd"];

const date = Temporal.Now.plainDateISO();
console.log(date);
let dayCodeName = dayOfWeekCode[date.dayOfWeek];
weekDayEl.textContent = weekDayName[dayCodeName];
const currentDate = `${date.day}-${date.month.toString().padStart("2", "0")}-${date.year} @${weekOfMonth()} ${dayOfWeekCode[date.dayOfWeek]}`;
//console.log(currentDate);
currentDateEl.textContent = currentDate;
let filteredData = filteringData(dayCodeName);
generateStreats(filteredData);

function generateStreats(arr) {
  mainContentEl.innerHTML = "";
  let temp = "";

  arr.forEach((el) => {
    let days = "";
    el.weekDays.forEach((day) => {
      const d = `<li>${day}</li>`;
      days += d;
    });

    const str = `
    <div class="streat-wrapper">
          <div class="streat">
            <div class="streat-name">${el.prefix} ${el.streatName}</div>
            <a class="streat-map-link" href="${el.googleMapsLink}" target="blank">googleMaps</a>
          </div>
          <div class="streat-desc">${el.streatDesc}</div>
          <ul>${days}</ul>   
        </div>
    `;
    temp += str;
    mainContentEl.innerHTML = temp;
  });
}
function filteringData(codeName) {
  return streats.filter(
    (streat) =>
      streat.weekDays.includes(codeName) ||
      streat.weekDays.includes(weekOfMonth() + codeName),
  );
}
function searchingData(text) {
  const re = new RegExp(`${text}`, "i");
  return streats.filter(
    (streat) => re.test(streat.streatName) || re.test(streat.streatDesc),
  );
}
function weekOfMonth() {
  return Math.ceil(date.day / 7);
} // zwraca króry mamy tydzień w miesiącu 1,2,3,4 lub 5

mySelect.addEventListener("change", (e) => {
  dayCodeName = e.target.value;
  weekDayEl.textContent = weekDayName[dayCodeName];
  filteredData = filteringData(dayCodeName);
  generateStreats(filteredData);
});

searchEl.addEventListener("keyup", (e) => {
  if (e.target.value !== "") {
    filteredData = searchingData(e.target.value);
    generateStreats(filteredData);
  } else {
    filteredData = filteringData(dayCodeName);
    generateStreats(filteredData);
  }
});
