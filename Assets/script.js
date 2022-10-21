var submitButtonEl = document.getElementById("submit");
var cityNameEl = document.getElementById("city-name");
var fiveDayForecast = document.getElementById("Forecast-5-days");
var selectedCityEl = document.getElementById("city-header");
var iconEl = document.getElementById("weatherIcon");
var tempEl = document.getElementById("temp");
var windEl = document.getElementById("wind");
var humidityEl = document.getElementById("humidity");
var searchBtnEl = document.getElementById("search-btn");
var searchedCities = document.getElementById("cities");
var searchHistory;

// reterive searchHistory form local storage
function init() {
  searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
  displaySearchHistory();
}
init();

// display search history list
function displaySearchHistory() {
  searchedCities.innerHTML = "";
  for (var i = 0; i < searchHistory.length; i++) {
    var liCity = document.createElement("li");
    liCity.textContent = searchHistory[i];
    searchedCities.appendChild(liCity);
  }
}

function cityClick(event) {
  var liClicked = event.target;
  if (!liClicked.matches("li")) {
    return;
  }
  weatherRetriveCordinates(liClicked.textContent);
}
// Below is the API link for 5 days weather forecast and  API key
function weatherRetriveCordinates(searchForCity) {
  // console.log("searchForCity", searchForCity);
  fetch(
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
      searchForCity +
      "&appid=a2e499dcd9906577a41fffe129b19c71"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      var latitude = data[0].lat;
      var longitude = data[0].lon;
      // console.log(latitude, longitude);
      getWeather(latitude, longitude);
      saveCityWhenSearched(searchForCity);
    })
    .catch(function (error) {
      console.log(error);
    });
  // .then(function (data){
  //   console.log(data)
  //   selectedCityEl.innerHTML = data.name
  // })
}

function saveCityWhenSearched(city) {
  let isNotInHistory = true;
  searchHistory.forEach((element) => {
    if (element == city) {
      isNotInHistory = false;
    }
  });
  if (isNotInHistory) {
    searchHistory.push(city);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    displaySearchHistory();
  }
}

// searchBtn.addEventListener('click', weatherHistory);

// below will be the 5 day Forecast
function getWeather(lat, lng) {
  // console.log(lat, lng);
  // fetch() using the 5-day forecast url given in the readme
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=a2e499dcd9906577a41fffe129b19c71`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data)
      displayFiveDayForecast(data);
      displayCurrentDayForecast(data);
      //   for(i=0;i<5;i++){
      //     console.log("day" +(i+1)+"temp")
      //     document.getElementById("day" +(i+1)+"temp").innerHTML ="temp:" +Number(data.list[i].main.temp).toFixed(1)+"°";
      //   }
      //   for(i=0;i<5;i++){
      //     document.getElementById("day" +(i+1)+"Humidity").innerHTML ="Humidity:" +Number(data.list[i].main.humidity);
      //     }
      //   for(i=0;i<5;i++){
      //     document.getElementById("day" +(i+1)+"Wind").innerHTML =":" +Number(data.list[i].wind.speed);
      //   }
      //   //need to enter date for forecast using moment j.s
      //   for(i=0;i<5;i++){
      //     document.getElementById("img"+(i+1)).src = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon+".png";
      // })
    });
}
// weatherRetriveCordinates("Los Angeles")

function displayCurrentDayForecast(forecastData) {
  console.log(forecastData);
  cityNameEl.innerHTML = "";
  // iconEl.innerHTML = "";
  var iconEl = document.createElement("img");
  const weatherIcon = document.querySelector("#weatherIcon");
  iconEl.setAttribute(
    "src",
    `https://openweathermap.org/img/w/${forecastData.list[0].weather[0].icon}.png`
  );
  weatherIcon.appendChild(iconEl);
  console.log(weatherIcon);
  var h1El = document.createElement("h1");
  h1El.innerHTML =
    forecastData.city.name + " (" + forecastData.list[0].dt_txt + ")";
  cityNameEl.appendChild(h1El);
  tempEl.innerHTML = forecastData.list[0].main.temp;
  windEl.innerHTML = forecastData.list[0].wind.speed;
  humidityEl.innerHTML = forecastData.list[0].main.humidity + " %";
}

function displayFiveDayForecast(forecastData) {
  fiveDayForecast.innerHTML = "";
  // console.log(forecastData);
  for (var i = 2; i < forecastData.list.length; i = i + 8) {
    // console.log(forecastData.city.name);
    // console.log(forecastData.list[i]);
    var oneDayForecastEl = document.createElement("div");
    oneDayForecastEl.setAttribute("class", "One-day-Forecast");
    var h1El = document.createElement("h1");
    h1El.setAttribute("class", "my-h1");
    h1El.innerHTML = forecastData.city.name + forecastData.list[i].dt_txt;
    oneDayForecastEl.appendChild(h1El);
    //document.getElementById("Forecast-5-days").appendChild(oneDayForecastEl);

    buildCard(forecastData, i);
    //date.textContent = data.list[i].dt;
    //mainIcon.src = `http://openweathermap.org/img/w/${data.list[i].weather[0].icon}+".png`;
    //mainWind.textContent = "Temp" + data.list[i].main.temp;
    //mainWind.textContent = "wind:" + data.list[i].wind.speed;
    //mainHumid.textContent = "Humidity: " + data.list[i].main.humidity;

    //card.append(date, mainIcon, mainTemp, mainWind, mainHumid);
    //cardDeck.append(card);
  }
  //console.log(card);
  // .catch((err) => console.log(err))
}

function buildCard(data, i) {
  var dataContainer = document.createElement("ul");
  dataContainer.setAttribute("class", "Wather-Forecast");

  // weatherIcon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}".png`;

  var forecastDate = document.createElement("h5");
  forecastDate.innerHTML = data.list[i].dt_txt;
  dataContainer.appendChild(forecastDate);

  var weatherIcon = document.createElement("img");
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`
  );
  dataContainer.appendChild(weatherIcon);

  var listItemTemp = document.createElement("li");
  var tempHeader = document.createElement("span");
  tempHeader.innerHTML = "Temp ";
  var tempData = document.createElement("span");
  tempData.setAttribute("class", "Temp");
  tempData.setAttribute("id", "day1temp");
  tempData.innerHTML = data.list[i].main.temp;
  listItemTemp.appendChild(tempHeader);
  listItemTemp.appendChild(tempData);
  dataContainer.appendChild(listItemTemp);

  var listItemWind = document.createElement("li");
  var windHeader = document.createElement("span");
  windHeader.innerHTML = "Wind ";
  var windData = document.createElement("span");
  windData.setAttribute("class", "Wind");
  windData.setAttribute("id", "day1Wind");
  windData.innerHTML = data.list[i].wind.speed + " MPH";
  listItemWind.appendChild(windHeader);
  listItemWind.appendChild(windData);
  dataContainer.appendChild(listItemWind);

  var listItemHumidity = document.createElement("li");
  var humidityHeader = document.createElement("span");
  humidityHeader.innerHTML = "Humidity";
  var humidityData = document.createElement("span");
  humidityData.setAttribute("class", "Humidity");
  humidityData.setAttribute("id", "day1Humidity");
  humidityData.innerHTML = data.list[i].main.humidity + "%";
  listItemHumidity.appendChild(humidityHeader);
  listItemHumidity.appendChild(humidityData);
  dataContainer.append(listItemHumidity);

  document.getElementById("Forecast-5-days").appendChild(dataContainer);
}

function displayWeather(event) {
  event.preventDefault();
  // console.log(searchBtnEl.value)
  weatherRetriveCordinates(searchBtnEl.value);
  searchBtnEl.value = "";
}

submitButtonEl.addEventListener("click", displayWeather);
searchedCities.addEventListener("click", cityClick);
