var cities = [];

var cityFormEl=document.querySelector("#city-search-form");
var cityInputEl=document.querySelector("#city");
var addressInputEl=document.querySelector("#address");
var stateInputEl=document.querySelector("#state");
var weatherContainerEl=document.querySelector("#current-weather-container");
var citySearchInputEl = document.querySelector("#searched-city");
var forecastTitle = document.querySelector("#forecast");
var forecastContainerEl = document.querySelector("#fiveday-container");
var pastSearchButtonEl = document.querySelector("#past-search-buttons");
var soilContainerEl = document.querySelector("#currentsoil");

var formSumbitHandler = function(event){
  event.preventDefault();
  var city = cityInputEl.value.trim();
  if(city){
      getCityWeather(city);
      get5Day(city);
      cities.unshift({city});
      cityInputEl.value = "";
  } else{
      alert("Please enter a City");
  }
  saveSearch();
  pastSearch(city);
}

var saveSearch = function(){
  localStorage.setItem("cities", JSON.stringify(cities));
};

function getCoordinates() {
  fetch("https://maps.googleapis.com/maps/api/geocode/json?address=944+Agua+Caliente,+El+Paso,+TX&key=AIzaSyDvRRtw_P5lPBhpH7bb8VJqCg7R7LtI9h0")
  .then((response) => {
    console.log(response);
    response.json().then((data) => {
      console.log(data);
    });
  })
}

var getCityWeather = function(city){
    var apiKey = "844421298d794574c100e3409cee0499"
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            displayWeather(data, city);
        });
    });
};

var displayWeather = function(weather, searchCity){
   //clear old content
   weatherContainerEl.textContent= "";  
   citySearchInputEl.textContent=searchCity;

   //console.log(weather);

   //create date element
   var currentDate = document.createElement("span")
   currentDate.textContent=" (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
   citySearchInputEl.appendChild(currentDate);

   //create an image element
   var weatherIcon = document.createElement("img")
   weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
   citySearchInputEl.appendChild(weatherIcon);

   //create a span element to hold temperature data
   var temperatureEl = document.createElement("span");
   temperatureEl.textContent = "Temperature: " + weather.main.temp + " °F";
   temperatureEl.classList = "list-group-item"
  
   //create a span element to hold Humidity data
   var humidityEl = document.createElement("span");
   humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";
   humidityEl.classList = "list-group-item"

   //create a span element to hold Wind data
   var windSpeedEl = document.createElement("span");
   windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
   windSpeedEl.classList = "list-group-item"

   //append to container
   weatherContainerEl.appendChild(temperatureEl);

   //append to container
   weatherContainerEl.appendChild(humidityEl);

   //append to container
   weatherContainerEl.appendChild(windSpeedEl);

   var lat = weather.coord.lat;
   var lon = weather.coord.lon;
   getUvIndex(lat,lon)
}

var getUvIndex = function(lat,lon){
    var apiKey = "844421298d794574c100e3409cee0499"
    var apiURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`
    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            displayUvIndex(data)
           console.log(data)
        });
    });
    console.log(lat);
    console.log(lon);
}
 
var displayUvIndex = function(index){
    var uvIndexEl = document.createElement("div");
    uvIndexEl.textContent = "UV Index: "
    uvIndexEl.classList = "list-group-item"

    uvIndexValue = document.createElement("span")
    uvIndexValue.textContent = index.value

    if(index.value <=2){
        uvIndexValue.classList = "favorable"
    }else if(index.value >2 && index.value<=8){
        uvIndexValue.classList = "moderate "
    }
    else if(index.value >8){
        uvIndexValue.classList = "severe"
    };

    uvIndexEl.appendChild(uvIndexValue);

    //append index to current weather
    weatherContainerEl.appendChild(uvIndexEl);
}

var get5Day = function(city){
    var apiKey = "844421298d794574c100e3409cee0499"
    var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
           display5Day(data);
        });
    });
};

var display5Day = function(weather){
    forecastContainerEl.textContent = ""
    forecastTitle.textContent = "5-Day Forecast:";

    var forecast = weather.list;
        for(var i=5; i < forecast.length; i=i+8){
       var dailyForecast = forecast[i];
        
       
       var forecastEl=document.createElement("div");
       forecastEl.classList = "card bg-primary text-light m-2";

       console.log(dailyForecast)

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

        console.log(forecastEl);
       //append to five day container
        forecastContainerEl.appendChild(forecastEl);
    }

}

// SOIL
function requestSoil() {
  fetch("https://api.ambeedata.com/soil/latest/by-lat-lng", {
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

var pastSearch = function(pastSearch){
 
    console.log(pastSearch)

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

pastSearch();

cityFormEl.addEventListener("submit", formSumbitHandler);
pastSearchButtonEl.addEventListener("click", pastSearchHandler);
