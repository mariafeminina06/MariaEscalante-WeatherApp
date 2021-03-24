function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
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
  let month = months[now.getMonth()];

  let calendarDate = now.getDate();
  if (calendarDate < 10) {
    calendarDate = `0${calendarDate}`;
  }

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `Today is <strong>${day}, ${calendarDate} ${month} ${now.getFullYear()}</strong>. <br />It is currently <strong>${hours}:${minutes}</strong>.`;
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
}

function getTimeinDestinationCity(timestamp) {
  let localTime = now.getTime();
  let localOffset = now.getTimezoneOffset() * 60000;
  let utc = localTime + localOffset;
  let foreignTime = new Date(utc + timestamp);
  let foreignHour = foreignTime.getHours();
  if (foreignHour < 10) {
    foreignHour = `0${foreignHour}`;
  }
  let foreignMinutes = foreignTime.getMinutes();
  if (foreignMinutes < 10) {
    foreignMinutes = `0${foreignMinutes}`;
  }

  let foreignCalendarDate = foreignTime.getDate();
  if (foreignCalendarDate < 10) {
    foreignCalendarDate = `0${foreignCalendarDate}`;
  }

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
  let foreignMonth = months[foreignTime.getMonth()];

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let foreignDateFormat = `${foreignCalendarDate} ${foreignMonth} ${foreignTime.getFullYear()}`;
  let foreignCityTimeElement = document.querySelector("#foreign-time");
  foreignCityTimeElement.innerHTML = `Time Now: ${foreignHour}${foreignMinutes}H`;
  let foreignDateElement = document.querySelector("#foreign-date");
  foreignDateElement.innerHTML = `Date: ${foreignDateFormat}`;

  let foreignDayElement = document.querySelector("#foreign-day");
  foreignDayElement.innerHTML = `Day: ${days[foreignTime.getDay()]}`;
}

function updateCurrentWeatherStatus(response) {
  currentCelsiusTemp = response.data.main.temp;
  let currentTemp = Math.round(currentCelsiusTemp);
  let feelTemperature = Math.round(response.data.main.feels_like);
  let currentMinTemp = Math.round(response.data.main.temp_min);
  let currentMaxTemp = Math.round(response.data.main.temp_max);
  let cityDisplayName = response.data.name;
  let countryDisplayName = response.data.sys.country;
  let currentLocation = document.querySelector("#current-city");
  currentLocation.innerHTML = `${cityDisplayName}, ${countryDisplayName}`;
  let currentTempElement = document.querySelector("#current-temperature");
  currentTempElement.innerHTML = currentTemp;
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

function convertToFahrenheit(event) {
  event.preventDefault();
  let currentTempElem = document.querySelector(".current-temperature");
  let fahrenheitConvertion = Math.round(currentCelsiusTemp * 1.8 + 32);
  currentTempElem.innerHTML = fahrenheitConvertion;
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
}

function convertToCelsius(event) {
  event.preventDefault();
  let currentTempElem = document.querySelector(".current-temperature");
  currentTempElem.innerHTML = Math.round(currentCelsiusTemp);
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

let now = new Date();
let celsiusTemp = null;

let apiKey = "c92de5786a79d17709375c8c4a5c958a";
let units = "metric";

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearch);

let locationServices = document.querySelector("#get-my-location");
locationServices.addEventListener("click", getNavigation);

let fahrenheitLink = document.querySelector("#convert-Fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#convert-Celsius");
celsiusLink.addEventListener("click", convertToCelsius);

searchInfo("Tokyo");
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
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
  let month = months[now.getMonth()];

  let calendarDate = now.getDate();
  if (calendarDate < 10) {
    calendarDate = `0${calendarDate}`;
  }

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `Today is <strong>${day}, ${calendarDate} ${month} ${now.getFullYear()}</strong>. <br />It is currently <strong>${hours}:${minutes}</strong>.`;
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
}

function getTimeinDestinationCity(timestamp) {
  let localTime = now.getTime();
  let localOffset = now.getTimezoneOffset() * 60000;
  let utc = localTime + localOffset;
  let foreignTime = new Date(utc + timestamp);
  let foreignHour = foreignTime.getHours();
  if (foreignHour < 10) {
    foreignHour = `0${foreignHour}`;
  }
  let foreignMinutes = foreignTime.getMinutes();
  if (foreignMinutes < 10) {
    foreignMinutes = `0${foreignMinutes}`;
  }

  let foreignCalendarDate = foreignTime.getDate();
  if (foreignCalendarDate < 10) {
    foreignCalendarDate = `0${foreignCalendarDate}`;
  }

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
  let foreignMonth = months[foreignTime.getMonth()];

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let foreignDateFormat = `${foreignCalendarDate} ${foreignMonth} ${foreignTime.getFullYear()}`;
  let foreignCityTimeElement = document.querySelector("#foreign-time");
  foreignCityTimeElement.innerHTML = `Time Now: ${foreignHour}${foreignMinutes}H`;
  let foreignDateElement = document.querySelector("#foreign-date");
  foreignDateElement.innerHTML = `Date: ${foreignDateFormat}`;

  let foreignDayElement = document.querySelector("#foreign-day");
  foreignDayElement.innerHTML = `Day: ${days[foreignTime.getDay()]}`;
}

function updateCurrentWeatherStatus(response) {
  currentCelsiusTemp = response.data.main.temp;
  let currentTemp = Math.round(currentCelsiusTemp);
  let feelTemperature = Math.round(response.data.main.feels_like);
  let currentMinTemp = Math.round(response.data.main.temp_min);
  let currentMaxTemp = Math.round(response.data.main.temp_max);
  let cityDisplayName = response.data.name;
  let countryDisplayName = response.data.sys.country;
  let currentLocation = document.querySelector("#current-city");
  currentLocation.innerHTML = `${cityDisplayName}, ${countryDisplayName}`;
  let currentTempElement = document.querySelector("#current-temperature");
  currentTempElement.innerHTML = currentTemp;
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

function convertToFahrenheit(event) {
  event.preventDefault();
  let currentTempElem = document.querySelector(".current-temperature");
  let fahrenheitConvertion = Math.round(currentCelsiusTemp * 1.8 + 32);
  currentTempElem.innerHTML = fahrenheitConvertion;
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
}

function convertToCelsius(event) {
  event.preventDefault();
  let currentTempElem = document.querySelector(".current-temperature");
  currentTempElem.innerHTML = Math.round(currentCelsiusTemp);
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

let now = new Date();
let celsiusTemp = null;

let apiKey = "c92de5786a79d17709375c8c4a5c958a";
let units = "metric";

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearch);

let locationServices = document.querySelector("#get-my-location");
locationServices.addEventListener("click", getNavigation);

let fahrenheitLink = document.querySelector("#convert-Fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#convert-Celsius");
celsiusLink.addEventListener("click", convertToCelsius);

searchInfo("Tokyo");
