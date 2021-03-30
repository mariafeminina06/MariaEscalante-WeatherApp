function getCurrentDate() {
  return `Today is <strong>${formatCalendarDate(
    now
  )}</strong>. <br />It is currently <strong>${formatHours(now)}</strong>.`;
}

function formatCalendarDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let day = days[date.getDay()];

  let month = months[date.getMonth()];

  let calendarDate = date.getDate();
  if (calendarDate < 10) {
    calendarDate = `0${calendarDate}`;
  }
  return `${day}, ${calendarDate} ${month} ${date.getFullYear()}`;
}

function formatHours(timestamp) {
  let hours = timestamp.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = timestamp.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function getCoords(response) {
  let latitude = response.data.coord.lat;
  let longitude = response.data.coord.lon;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(updateForecast);
}

function getNavigation() {
  navigator.geolocation.getCurrentPosition(getLocation);
}

function getLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(updateCurrentWeatherStatus);

  apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(updateForecast);
}

function handleSearch(event) {
  event.preventDefault();
  let searchBar = document.querySelector("#search-bar");
  let city = searchBar.value;
  searchInfo(city);
}

function searchInfo(city) {
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(updateCurrentWeatherStatus);

  axios.get(apiURL).then(getCoords);
}

function getTimeinDestinationCity(timestamp) {
  let localTime = now.getTime();
  let localOffset = now.getTimezoneOffset() * 60000;
  let utc = localTime + localOffset;
  let foreignTime = new Date(utc + timestamp);

  let foreignCalendarDate = foreignTime.getDate();
  if (foreignCalendarDate < 10) {
    foreignCalendarDate = `0${foreignCalendarDate}`;
  }

  let foreignCityTimeElement = document.querySelector("#foreign-time");
  foreignCityTimeElement.innerHTML = `Local Time: <strong>${formatHours(
    foreignTime
  )}</strong>`;
  let foreignDateElement = document.querySelector("#foreign-date");
  foreignDateElement.innerHTML = `Local Date:  <strong>${formatCalendarDate(
    foreignTime
  )}</strong>`;
}

function updateCurrentWeatherStatus(response) {
  currentCelsiusTemp = response.data.main.temp;
  let currentTemp = Math.round(currentCelsiusTemp);

  celsiusFeel = response.data.main.feels_like;
  let feelTemperature = Math.round(celsiusFeel);

  minCelsius = response.data.main.temp_min;
  let currentMinTemp = Math.round(minCelsius);

  maxCelsius = response.data.main.temp_max;
  let currentMaxTemp = Math.round(maxCelsius);

  let currentTempElement = document.querySelector("#current-temperature");
  currentTempElement.innerHTML = currentTemp;

  let cityDisplayName = response.data.name;
  let countryDisplayName = response.data.sys.country;
  let currentLocation = document.querySelector("#current-city");
  currentLocation.innerHTML = `${cityDisplayName}, ${countryDisplayName}`;

  let weatherDescriptionElement = document.querySelector(
    "#current-weather-description"
  );
  weatherDescriptionElement.innerHTML = response.data.weather[0].description;

  let feelElement = document.querySelector("#feel-temp");
  feelElement.innerHTML = `Feels like: ${feelTemperature}°`;

  let currentMinTempElement = document.querySelector("#current-min-temp");
  currentMinTempElement.innerHTML = `Min: ${currentMinTemp}°`;

  let currentMaxTempElement = document.querySelector("#current-max-temp");
  currentMaxTempElement.innerHTML = `Max: ${currentMaxTemp}°`;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind: ${Math.round(
    response.data.wind.speed * 3.6
  )} km/h`;

  let currentWeatherIconElement = document.querySelector(
    "#current-weather-icon"
  );
  let iconNumber = response.data.weather[0].icon;
  currentWeatherIconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${iconNumber}@2x.png`
  );
  currentWeatherIconElement.setAttribute(
    "alt",
    response.data.weather[0].description
  );

  let cityOffset = getTimeinDestinationCity(response.data.timezone * 1000);
}

function updateForecast(response) {
  console.log(response.data);
  let iconUrl = `https://openweathermap.org/img/wn/`;

  //Day 1
  dt1 = response.data.daily[1].dt * 1000;
  date1 = new Date(dt1);
  let day1Label = document.querySelector("#day01");
  day1Label.innerHTML = date1.toLocaleString("en-US", { weekday: "long" });

  let day1Icon = document.querySelector("#day01-icon");
  let icon1 = response.data.daily[1].weather[0].icon;
  let icon1Url = `${iconUrl}${icon1}.png`;
  day1Icon.setAttribute("src", `${icon1Url}`);

  let day1MaxElement = document.querySelector("#day01-maxtemp");
  day1MaxCelsius = response.data.daily[1].temp.max;
  maxTemp1 = Math.round(day1MaxCelsius);
  day1MaxElement.innerHTML = `<strong>${maxTemp1}°</strong>`;

  let day1MinElement = document.querySelector("#day01-mintemp");
  day1MinCelsius = response.data.daily[1].temp.min;
  minTemp1 = Math.round(day1MinCelsius);
  day1MinElement.innerHTML = `${minTemp1}°`;

  let day1Description = document.querySelector("#day01-weather-description");
  day1Description.innerHTML = response.data.daily[1].weather[0].description;

  //Day 2
  dt2 = response.data.daily[2].dt * 1000;
  date2 = new Date(dt2);
  let day2Label = document.querySelector("#day02");
  day2Label.innerHTML = date2.toLocaleString("en-US", { weekday: "long" });

  let day2Icon = document.querySelector("#day02-icon");
  let icon2 = response.data.daily[2].weather[0].icon;
  let icon2Url = `${iconUrl}${icon1}.png`;
  day2Icon.setAttribute("src", `${icon2Url}`);

  let day2MaxElement = document.querySelector("#day02-maxtemp");
  day2MaxCelsius = response.data.daily[2].temp.max;
  maxTemp2 = Math.round(day2MaxCelsius);
  day2MaxElement.innerHTML = `<strong>${maxTemp2}°</strong>`;

  let day2MinElement = document.querySelector("#day02-mintemp");
  day2MinCelsius = response.data.daily[2].temp.min;
  minTemp2 = Math.round(day2MinCelsius);
  day2MinElement.innerHTML = `${minTemp2}°`;

  let day2Description = document.querySelector("#day02-weather-description");
  day2Description.innerHTML = response.data.daily[2].weather[0].description;

  //Day 3
  dt3 = response.data.daily[3].dt * 1000;
  date3 = new Date(dt3);
  let day3Label = document.querySelector("#day03");
  day3Label.innerHTML = date3.toLocaleString("en-US", { weekday: "long" });

  let day3Icon = document.querySelector("#day03-icon");
  let icon3 = response.data.daily[3].weather[0].icon;
  let icon3Url = `${iconUrl}${icon3}.png`;
  day3Icon.setAttribute("src", `${icon3Url}`);

  let day3MaxElement = document.querySelector("#day03-maxtemp");
  day3MaxCelsius = response.data.daily[3].temp.max;
  maxTemp3 = Math.round(day3MaxCelsius);
  day3MaxElement.innerHTML = `<strong>${maxTemp3}°</strong>`;

  let day3MinElement = document.querySelector("#day03-mintemp");
  day3MinCelsius = response.data.daily[3].temp.min;
  minTemp3 = Math.round(day3MinCelsius);
  day3MinElement.innerHTML = `${minTemp3}°`;

  let day3Description = document.querySelector("#day03-weather-description");
  day3Description.innerHTML = response.data.daily[3].weather[0].description;

  //Day 4
  dt4 = response.data.daily[4].dt * 1000;
  date4 = new Date(dt4);
  let day4Label = document.querySelector("#day04");
  day4Label.innerHTML = date4.toLocaleString("en-US", { weekday: "long" });

  let day4Icon = document.querySelector("#day04-icon");
  let icon4 = response.data.daily[4].weather[0].icon;
  let icon4Url = `${iconUrl}${icon4}.png`;
  day4Icon.setAttribute("src", `${icon4Url}`);

  let day4MaxElement = document.querySelector("#day04-maxtemp");
  day4MaxCelsius = response.data.daily[4].temp.max;
  maxTemp4 = Math.round(day4MaxCelsius);
  day4MaxElement.innerHTML = `<strong>${maxTemp4}°</strong>`;

  let day4MinElement = document.querySelector("#day04-mintemp");
  day4MinCelsius = response.data.daily[4].temp.min;
  minTemp4 = Math.round(day4MinCelsius);
  day4MinElement.innerHTML = `${minTemp4}°`;

  let day4Description = document.querySelector("#day04-weather-description");
  day4Description.innerHTML = response.data.daily[4].weather[0].description;

  //Day 5
  dt5 = response.data.daily[5].dt * 1000;
  date5 = new Date(dt5);
  let day5Label = document.querySelector("#day05");
  day5Label.innerHTML = date5.toLocaleString("en-US", { weekday: "long" });

  let day5Icon = document.querySelector("#day05-icon");
  let icon5 = response.data.daily[5].weather[0].icon;
  let icon5Url = `${iconUrl}${icon5}.png`;
  day5Icon.setAttribute("src", `${icon5Url}`);

  let day5MaxElement = document.querySelector("#day05-maxtemp");
  day5MaxCelsius = response.data.daily[5].temp.max;
  maxTemp5 = Math.round(day5MaxCelsius);
  day5MaxElement.innerHTML = `<strong>${maxTemp5}°</strong>`;

  let day5MinElement = document.querySelector("#day05-mintemp");
  day5MinCelsius = response.data.daily[5].temp.min;
  minTemp5 = Math.round(day5MinCelsius);
  day5MinElement.innerHTML = `${minTemp5}°`;

  let day5Description = document.querySelector("#day05-weather-description");
  day5Description.innerHTML = response.data.daily[5].weather[0].description;
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let currentTempElem = document.querySelector(".current-temperature");
  let fahrenheitConvertion = Math.round(currentCelsiusTemp * 1.8 + 32);
  currentTempElem.innerHTML = fahrenheitConvertion;

  let fahrenheitFeel = Math.round(celsiusFeel * 1.8 + 32);
  let feelElement = document.querySelector("#feel-temp");
  feelElement.innerHTML = `Feels like: ${fahrenheitFeel}°`;

  let minFahrenheit = Math.round(minCelsius * 1.8 + 32);
  let currentMinTempElement = document.querySelector("#current-min-temp");
  currentMinTempElement.innerHTML = `Min: ${minFahrenheit}°`;

  let maxFahrenheit = Math.round(maxCelsius * 1.8 + 32);
  let currentMaxTempElement = document.querySelector("#current-max-temp");
  currentMaxTempElement.innerHTML = `Max: ${maxFahrenheit}°`;

  let day1MaxFahrenheit = Math.round(day1MaxCelsius * 1.8 + 32);
  let day1MaxElement = document.querySelector("#day01-maxtemp");
  day1MaxElement.innerHTML = `<strong>${day1MaxFahrenheit}°</strong>`;

  let day1MinFahrenheit = Math.round(day1MinCelsius * 1.8 + 32);
  let day1MinElement = document.querySelector("#day01-mintemp");
  day1MinElement.innerHTML = `${day1MinFahrenheit}°`;

  let day2MaxFahrenheit = Math.round(day2MaxCelsius * 1.8 + 32);
  let day2MaxElement = document.querySelector("#day02-maxtemp");
  day2MaxElement.innerHTML = `<strong>${day2MaxFahrenheit}°</strong>`;

  let day2MinFahrenheit = Math.round(day2MinCelsius * 1.8 + 32);
  let day2MinElement = document.querySelector("#day02-mintemp");
  day2MinElement.innerHTML = `${day2MinFahrenheit}°`;

  let day3MaxFahrenheit = Math.round(day3MaxCelsius * 1.8 + 32);
  let day3MaxElement = document.querySelector("#day03-maxtemp");
  day3MaxElement.innerHTML = `<strong>${day3MaxFahrenheit}°</strong>`;

  let day3MinFahrenheit = Math.round(day3MinCelsius * 1.8 + 32);
  let day3MinElement = document.querySelector("#day03-mintemp");
  day3MinElement.innerHTML = `${day3MinFahrenheit}°`;

  let day4MaxFahrenheit = Math.round(day4MaxCelsius * 1.8 + 32);
  let day4MaxElement = document.querySelector("#day04-maxtemp");
  day4MaxElement.innerHTML = `<strong>${day4MaxFahrenheit}°</strong>`;

  let day4MinFahrenheit = Math.round(day4MinCelsius * 1.8 + 32);
  let day4MinElement = document.querySelector("#day04-mintemp");
  day4MinElement.innerHTML = `${day4MinFahrenheit}°`;

  let day5MaxFahrenheit = Math.round(day5MaxCelsius * 1.8 + 32);
  let day5MaxElement = document.querySelector("#day05-maxtemp");
  day5MaxElement.innerHTML = `<strong>${day5MaxFahrenheit}°</strong>`;

  let day5MinFahrenheit = Math.round(day5MinCelsius * 1.8 + 32);
  let day5MinElement = document.querySelector("#day05-mintemp");
  day5MinElement.innerHTML = `${day5MinFahrenheit}°`;

  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
}

function convertToCelsius(event) {
  event.preventDefault();
  let currentTempElem = document.querySelector(".current-temperature");
  currentTempElem.innerHTML = Math.round(currentCelsiusTemp);

  let feelElement = document.querySelector("#feel-temp");
  feelElement.innerHTML = `Feels like: ${Math.round(celsiusFeel)}°`;

  let currentMinTempElement = document.querySelector("#current-min-temp");
  currentMinTempElement.innerHTML = `Min: ${Math.round(minCelsius)}°`;

  let currentMaxTempElement = document.querySelector("#current-max-temp");
  currentMaxTempElement.innerHTML = `Max: ${Math.round(maxCelsius)}°`;

  let day1MaxElement = document.querySelector("#day01-maxtemp");
  day1MaxElement.innerHTML = `<strong>${Math.round(day1MaxCelsius)}°</strong>`;

  let day1MinElement = document.querySelector("#day01-mintemp");
  day1MinElement.innerHTML = `${Math.round(day1MinCelsius)}°`;

  let day2MaxElement = document.querySelector("#day02-maxtemp");
  day2MaxElement.innerHTML = `<strong>${Math.round(day2MaxCelsius)}°</strong>`;

  let day2MinElement = document.querySelector("#day02-mintemp");
  day2MinElement.innerHTML = `${Math.round(day2MinCelsius)}°`;

  let day3MaxElement = document.querySelector("#day03-maxtemp");
  day3MaxElement.innerHTML = `<strong>${Math.round(day3MaxCelsius)}°</strong>`;

  let day3MinElement = document.querySelector("#day03-mintemp");
  day3MinElement.innerHTML = `${Math.round(day3MinCelsius)}°`;

  let day4MaxElement = document.querySelector("#day04-maxtemp");
  day4MaxElement.innerHTML = `<strong>${Math.round(day4MaxCelsius)}°</strong>`;

  let day4MinElement = document.querySelector("#day04-mintemp");
  day4MinElement.innerHTML = `${Math.round(day4MinCelsius)}°`;

  let day5MaxElement = document.querySelector("#day05-maxtemp");
  day5MaxElement.innerHTML = `<strong>${Math.round(day5MaxCelsius)}°</strong>`;

  let day5MinElement = document.querySelector("#day05-mintemp");
  day5MinElement.innerHTML = `${Math.round(day5MinCelsius)}°`;

  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

let now = new Date();
let celsiusTemp = null;
let celsiusFeel = null;
let minCelsius = null;
let maxCelsius = null;
let day1MaxCelsius = null;
let day2MaxCelsius = null;
let day3MaxCelsius = null;
let day4MaxCelsius = null;
let day5MaxCelsius = null;
let day1MinCelsius = null;
let day2MinCelsius = null;
let day3MinCelsius = null;
let day4MinCelsius = null;
let day5MinCelsius = null;

let apiKey = "c92de5786a79d17709375c8c4a5c958a";
let units = "metric";

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = getCurrentDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearch);

let locationServices = document.querySelector("#get-my-location");
locationServices.addEventListener("click", getNavigation);

let fahrenheitLink = document.querySelector("#convert-Fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#convert-Celsius");
celsiusLink.addEventListener("click", convertToCelsius);

searchInfo("Tokyo");
