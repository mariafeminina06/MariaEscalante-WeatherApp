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
  foreignCityTimeElement.innerHTML = `Local time: <strong>${formatHours(
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

  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

let now = new Date();
let celsiusTemp = null;
let celsiusFeel = null;
let minCelsius = null;
let maxCelsius = null;

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
