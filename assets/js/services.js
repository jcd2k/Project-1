var addressInputEl = document.querySelector("searchBarAddress");
var cityInputEl = document.querySelector("searchBarCity");
var stateInputEl = document.querySelector("searchBarState");
var forecastDisplay = document.getElementById('forecastDisplay');

const userSearch = document.getElementById('searchBar')

function getCoordinates() {
  fetch("https://maps.googleapis.com/maps/api/geocode/json?address=944+Agua+Caliente,+El+Paso,+TX&key=AIzaSyDvRRtw_P5lPBhpH7bb8VJqCg7R7LtI9h0")
  .then((response) => {
    console.log(response);
    response.json().then((data) => {
      console.log(data);
    });
  })
}

function get7Day() {
  var key = 'd31373940f7f8b59573632e5332e9f3f';
  fetch('https://api.openweathermap.org/data/2.5/onecall?lat=35&lon=139&appid=' + key)  
  .then(function(resp) { return resp.json() }) // Convert data to json
  .then(function(data) {
    console.log(data);
    displayWeather(data)
  })
  .catch(function() {
    // catch any errors
  });
}

var display7Day = function(weather){
    forecastContainerEl.textContent = ""
    forecastTitle.textContent = "5-Day Forecast:";

    var forecast = weather.list;
        for(var i=5; i < forecast.length; i=i+8){
       var dailyForecast = forecast[i];
        
       
       var forecastEl=document.createElement("div");
       forecastEl.classList = "card bg-primary text-light m-2";

       //console.log(dailyForecast)

       //create date element
       var forecastDate = document.createElement("h5")
       forecastDate.textContent= moment.unix(dailyForecast.dt).format("MMM D, YYYY");
       forecastDate.classList = "card-header text-center"
       forecastEl.appendChild(forecastDate);

       
       //create an image element
       var weatherIcon = document.createElement("img")
       weatherIcon.classList = "card-body text-center";
       weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`);  

       //append to forecast card
       forecastEl.appendChild(weatherIcon);
       
       //create temperature span
       var forecastTempEl=document.createElement("span");
       forecastTempEl.classList = "card-body text-center";
       forecastTempEl.textContent = dailyForecast.main.temp + " °F";

        //append to forecast card
        forecastEl.appendChild(forecastTempEl);

       var forecastHumEl=document.createElement("span");
       forecastHumEl.classList = "card-body text-center";
       forecastHumEl.textContent = dailyForecast.main.humidity + "  %";

       //append to forecast card
       forecastEl.appendChild(forecastHumEl);

        // console.log(forecastEl);
       //append to five day container
        forecastContainerEl.appendChild(forecastEl);
    }

}

function requestSoil() {
    fetch("https://api.ambeedata.com/soil/latest/by-lat-lng?lat=12.9889055&lng=77.574044", {
      "method": "GET",
      "headers": {
        "x-api-key": "3c5a5051d024c308e76bc2b15d2749e716b5395201a876fd6cf3453a7d6eb9b3",
        "Content-type": "application/json"
      }
    }).then((response) => {
      console.log(response);
      response.json().then((data) => {
        console.log(data);
      });
    })
  };
  
  function saveLastWeather() {
    // Save related form data as an object
  var weatherDetails = {
    temperature: temperature.value,
    humidity: humidity.value,
    uvIndex: uvIndex.value,
  }
  // Use .setItem() to store object in storage and JSON.stringify to convert it as a string
  localStorage.setItem("weatherDetails", JSON.stringify(weatherDetails));
}

function renderLastWeather() {
  // Use JSON.parse() to convert text to JavaScript object
  var lastWeather = JSON.parse(localStorage.getItem("weatherDetails"));
  // Check if data is returned, if not exit out of the function
  if (lastWeather !== null) {
  document.getElementById("temp").innerHTML = lastWeather.temp;
  document.getElementById("humid").innerHTML = lastWeather.humid;
  document.getElementById("uv").innerHTML = lastWeather.uv;
  } else {
    return;
  }
}

function renderLastWeather() {
  // Use JSON.parse() to convert text to JavaScript object
  var lastWeather = JSON.parse(localStorage.getItem("weatherDetails"));
  // Check if data is returned, if not exit out of the function
  if (lastWeather !== null) {
  document.getElementById("temp").innerHTML = lastWeather.temp;
  document.getElementById("humid").innerHTML = lastWeather.humid;
  document.getElementById("uv").innerHTML = lastWeather.uv;
  } else {
    return;
  }
}


function renderWeather () {

}

getCoordinates()

requestWeather()

displayWeather()

var pastSearch = function(pastSearch){
 
    // console.log(pastSearch)

    pastSearchEl = document.createElement("button");
    pastSearchEl.textContent = pastSearch;
    pastSearchEl.classList = "d-flex w-100 btn-light border p-2";
    pastSearchEl.setAttribute("data-city",pastSearch)
    pastSearchEl.setAttribute("type", "submit");

    pastSearchButtonEl.prepend(pastSearchEl);
}


var pastSearchHandler = function(event){
    var city = event.target.getAttribute("data-city")
    if(city){
        getCityWeather(city);
        get5Day(city);
    }
}

// pastSearch();

cityFormEl.addEventListener("submit", formSumbitHandler);
pastSearchButtonEl.addEventListener("click", pastSearchHandler);

// appends - state selection for soil data, weather dashboard for corresponding input - card content 

function init() {
  // When the init function is executed, the code inside renderLastGrade function will also execute
  renderLastWeather();
}

init()

