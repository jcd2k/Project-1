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
		"x-api-key": "API_KEY",
		"Content-type": "application/json"
	}
}).then((response) => {
    console.log(response);
    response.json().then((data) => {
      console.log(data);
    });
  })

  // var currentWeather = $(`
  //   <h2 id="currentWeather">
  //       ${weatherResponse.name} ${today} 
  //   </h2>
  //   <p>Temperature: ${response.main.temp} °F</p>
  //   <p>Humidity: ${response.main.humidity}\%</p>
  //   <p>Wind Speed: ${response.wind.speed} MPH</p>
  // `);

  // $("#forecastDisplay").append(currentWeather);

};


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

function renderWeather (){

}

function saveLastSearch() {
  var lastSearch = {
      history:
  };
  localStorage.setItem("lastSearch", JSON.stringify(lastSearch));
}

getCoordinates()

requestWeather()

// appends - state selection for soil data, weather dashboard for corresponding input - card content 