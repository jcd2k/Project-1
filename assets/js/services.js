
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

function requestWeather(lat, long) {
  fetch("https://api.ambeedata.com/weather/forecast/by-lat-lng?lat=12.9889055&lng=77.574044&filter=%7Bhourly%7Cminutely%7Cdaily%7D", {
	"method": "GET",
	"headers": {
		"x-api-key": "6daaa382f98875845ab18f8a3b543169336e5b8020404394ed68c712e6e45efd",
		"Content-type": "application/json"
	}
}).then((response) => {
    console.log(response);
    response.json()
  })
  .then((data) => {
    console.log(data);
  });
};


var serachedTerm = document.getElementById("searchedTerm");

function saveLastWeather() {
  // Save related form data as an object
  var weatherDetails = {
    temperature: temperature.value,
    humidity: humidity.value,
    uvIndex: uvIndex.value,
  };
  // Use .setItem() to store object in storage and JSON.stringify to convert it as a string
  localStorage.setItem("weatherDetails", JSON.stringify(weatherDetails));
}

function renderLastWeather() {
  // Use JSON.parse() to convert text to JavaScript object
  var lastWeather = JSON.parse(localStorage.getItem("weatherDetails"));
  // Check if data is returned, if not exit out of the function
  if (lastWeather !== null) {
  document.getElementById("searchedTerm").innerHTML = lastWeather.searchedTerm;
  document.getElementById("temp").innerHTML = lastWeather.temp;
  document.getElementById("humid").innerHTML = lastWeather.humid;
  document.getElementById("uv").innerHTML = lastWeather.uv;
  } else {
    return;
  }
}

function requestSoil(lat, long) {
  fetch("https://api.ambeedata.com/soil/latest/by-lat-lng?lat=12.9889055&lng=77.574044", {
    "method": "GET",
    "headers": {
      "x-api-key": "9701541e554818ac1427335351c7c2e9a4bda649a060ab3d66ce553ff6de5b0e",
      "Content-type": "application/json"
  }
  }).then((response) => {
    console.log(response);
    response.json().then((data) => {
      console.log(data);
    });
  })
};



searchButton.addEventListener("click", function(event) {
  event.preventDefault();
    localStorage.setItem("searchedTerm", searchedTerm);
    localStorage.setItem("temp", temp);
    localStorage.setItem("humid", humid);
    localStorage.setItem("uv", uv);
    renderLastRegistered();
});


function renderWeather (){

}

getCoordinates()

<<<<<<< HEAD
// appends - state selection for soil data, weather dashboard for corresponding input - card content 
=======
requestWeather()

// appends - state selection for soil data, weather dashboard for corresponding input - card content 

function init() {
  // When the init function is executed, the code inside renderLastGrade function will also execute
  renderLastWeather();
}
init();
>>>>>>> 4a1e3c4e887cca98c486ae68bfd53d532d5539c2
