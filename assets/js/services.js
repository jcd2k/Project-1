var cityInputEl = document.querySelector("searchBar");
var forecastDisplay = document.getElementById('forecastDisplay');
var cityInputEl = document.querySelector("searchBar");

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

function requestWeather() {
  var key = 'd31373940f7f8b59573632e5332e9f3f';
  fetch('https://api.openweathermap.org/data/2.5/onecall?lat=35&lon=139&appid=' + key)  
  .then(function(resp) { return resp.json() }) // Convert data to json
  .then(function(data) {
    console.log(data);
  })
  .catch(function() {
    // catch any errors
  });
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


function renderWeather (){

}

getCoordinates()

requestWeather()


// appends - state selection for soil data, weather dashboard for corresponding input - card content 

function init() {
  // When the init function is executed, the code inside renderLastGrade function will also execute
  renderLastWeather();
}

init()