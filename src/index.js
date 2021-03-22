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

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `Today is <strong>${day}, ${now.getDate()} ${month} ${now.getFullYear()}</strong>. <br />It is currently <strong>${hours}:${minutes}</strong>.`;
}

function getNavigation() {
  navigator.geolocation.getCurrentPosition(getLocation);
}

function getLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function searchInfo(event) {
  event.preventDefault();
  let searchBar = document.querySelector("#search-bar");
  let city = searchBar.value;

  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiURL).then(showWeather);
}

let now = new Date();
let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchInfo);

let locationServices = document.querySelector("#get-my-location");
locationServices.addEventListener("click", getNavigation);

//🙀Bonus Feature
//Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.
function convertToFahrenheit(event) {
  event.preventDefault();
  let currentTempElem = document.querySelector(".current-Celsius-temperature");
  let currentTemp = currentTempElem.innerHTML;
  let fahrenheitConvertion = Math.round(currentTemp * 1.8 + 32);
  currentTempElem.innerHTML = fahrenheitConvertion;
}

function convertToCelsius(event) {
  event.preventDefault();
  let currentTempElem = document.querySelector(".current-Celsius-temperature");
  let currentTemp = currentTempElem.innerHTML;
  let celsiusConvertion = Math.round((currentTemp - 32) / 1.8);
  currentTempElem.innerHTML = celsiusConvertion;
}

let fahrenheitLink = document.querySelector("#convert-Fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let CelsiusLink = document.querySelector("#convert-Celsius");
CelsiusLink.addEventListener("click", convertToCelsius);

// trial code

function showWeather(response) {
  let currentTemp = Math.round(response.data.main.temp);
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
}

let apiKey = "c92de5786a79d17709375c8c4a5c958a";
let currentCity = document.querySelector("#current-city");
let city = currentCity.innerHTML;
let units = "metric";
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

axios.get(apiURL).then(showWeather);
