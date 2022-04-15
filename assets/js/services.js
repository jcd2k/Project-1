// var serachedTerm = document.getElementById("searchedTerm");
// var forecastDisplay = document.getElementById('forecastDisplay');

// const userSearch = document.getElementById('searchBar')


var apiKey = "d31373940f7f8b59573632e5332e9f3f";

function weather(city) {
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(weatherResponse) {
        console.log(weatherResponse);

        $("#currentWeather").css("display", "block");
        $("#forecastDisplay").empty();
// icons
        var iconCode = weatherResponse.weather[0].icon;
        var iconURL = `https://openweathermap.org/img/w/${iconCode}.png`;

        // appending current weather details
        var currentCity = $(`
            <h2 id="currentCity">
                ${weatherResponse.name} ${today} <img src="${iconURL}" alt="${weatherResponse.weather[0].description}" />
            </h2>
            <p>Temperature: ${weatherResponse.main.temp} °F</p>
            <p>Humidity: ${weatherResponse.main.humidity}\%</p>
            <p>Wind Speed: ${weatherResponse.wind.speed} MPH</p>
        `);

        $("#forecastDisplay").append(currentCity);
    // latitude and longitude
        var lat = weatherResponse.coord.lat;
        var lon = weatherResponse.coord.lon;
        var uvQueryURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        $.ajax({
            url: uvQueryURL,
            method: "GET"
        }).then(function(uvResponse) {
            console.log(uvResponse)

            var uvIndex = uvResponse.value;
            var uvIndexP = $(`
                <p>UV Index: 
                    <span id="uvIndexColor" class="px-2 py-2 rounded">${uvIndex}</span>
                </p>
            `);

            $("#forecastDisplay").append(uvIndexP);

            futureCondition(lat, lon);
// uv color changes
// green
            if (uvIndex >= 0 && uvIndex <= 2) {
                $("#uvIndexColor").css("background-color", "#3EA72D").css("color", "white");
                // yellow
            } else if (uvIndex >= 3 && uvIndex <= 5) {
                $("#uvIndexColor").css("background-color", "#FFF300");
            } else if (uvIndex >= 6 && uvIndex <= 7) {
                // orange
                $("#uvIndexColor").css("background-color", "#F18B00");
            } else if (uvIndex >= 8 && uvIndex <= 10) {
                // red
                $("#uvIndexColor").css("background-color", "#E53210").css("color", "white");
            } else {
                // violet
                $("#uvIndexColor").css("background-color", "#B567A4").css("color", "white"); 
            };  

        });

    });
}

function futureCondition(lat, lon) {

    var futureURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=current,minutely,hourly,alerts&appid=${apiKey}`;

    $.ajax({
        url: futureURL,
        method: "GET"
    }).then(function(futureResponse) {
        console.log(futureResponse);
        $("#fiveForecast").empty();
        
        for (let i = 1; i < 6; i++) {
            var cityInfo = {
                date: futureResponse.daily[i].dt,
                icon: futureResponse.daily[i].weather[0].icon,
                temp: futureResponse.daily[i].temp.day,
                humidity: futureResponse.daily[i].humidity
            };

            var currDate = moment.unix(cityInfo.date).format("MM/DD/YYYY");
            var iconURL = `<img src="https://openweathermap.org/img/w/${cityInfo.icon}.png" alt="${futureResponse.daily[i].weather[0].main}" />`;

// date, icon, temp, humidity
            var futureCard = $(`
                <div class="pl-3">
                    <div class="card pl-3 pt-3 mb-3 bg-primary text-light" style="width: 12rem;>
                        <div class="card-body">
                            <h5>${currDate}</h5>
                            <p>${iconURL}</p>
                            <p>Temp: ${cityInfo.temp} °F</p>
                            <p>Humidity: ${cityInfo.humidity}\%</p>
                        </div>
                    </div>
                <div>
            `);

            $("#fiveForecast").append(futureCard);
        }
    }); 
}

// search button click event listener 
// $("#searchBtn").on("click", function(event) {
//     event.preventDefault();
// })






// function getCoordinates() {
//   fetch("https://maps.googleapis.com/maps/api/geocode/json?address=944+Agua+Caliente,+El+Paso,+TX&key=AIzaSyDvRRtw_P5lPBhpH7bb8VJqCg7R7LtI9h0")
//   .then((response) => {
//     console.log(response);
//     response.json().then((data) => {
//       console.log(data);
//     });
//   })
// }

// function requestWeather() {
//   fetch("https://api.ambeedata.com/weather/forecast/by-lat-lng?lat=12.9889055&lng=77.574044&filter=%7Bhourly%7Cminutely%7Cdaily%7D", {
// 	"method": "GET",
// 	"headers": {
// 		"x-api-key": "3c5a5051d024c308e76bc2b15d2749e716b5395201a876fd6cf3453a7d6eb9b3",
// 		"Content-type": "application/json"
// 	}
// }).then((response) => {
//     console.log(response);
//     response.json().then((data) => {
//       console.log(data);
//     });
//   })
// };

// function requestWeather() {
//   fetch("api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}", {
// 	"method": "GET",
// 	"headers": {
// 		"x-api-key": "3c5a5051d024c308e76bc2b15d2749e716b5395201a876fd6cf3453a7d6eb9b3",
// 		"x-api-key": "6daaa382f98875845ab18f8a3b543169336e5b8020404394ed68c712e6e45efd",
// 		"Content-type": "application/json"
// 	}
// }).then((response) => {
//     console.log(response);
//     response.json().then((data) => {
//       console.log(data);
//     });
//   })
// };

// function saveLastWeather() {
  // Save related form data as an object
  // var weatherDetails = {
  //   temperature: temperature.value,
  //   humidity: humidity.value,
  //   uvIndex: uvIndex.value,
  // }
  // Use .setItem() to store object in storage and JSON.stringify to convert it as a string
//   localStorage.setItem("weatherDetails", JSON.stringify(weatherDetails));
// }

// function renderLastWeather() {
  // Use JSON.parse() to convert text to JavaScript object
  // var lastWeather = JSON.parse(localStorage.getItem("weatherDetails"));
  // Check if data is returned, if not exit out of the function
//   if (lastWeather !== null) {
//   document.getElementById("temp").innerHTML = lastWeather.temp;
//   document.getElementById("humid").innerHTML = lastWeather.humid;
//   document.getElementById("uv").innerHTML = lastWeather.uv;
//   } else {
//     return;
//   }
// }

// function requestSoil() {
//   fetch("https://api.ambeedata.com/soil/latest/by-lat-lng?lat=12.9889055&lng=77.574044", {
//     "method": "GET",
//     "headers": {
//       "x-api-key": "3c5a5051d024c308e76bc2b15d2749e716b5395201a876fd6cf3453a7d6eb9b3",
//       "Content-type": "application/json"
//   }
//   }).then((response) => {
//     console.log(response);
//     response.json().then((data) => {
//       console.log(data);
//     });
//   })
// };

// function renderWeather (){

// }

// getCoordinates()

// requestWeather()

// appends - state selection for soil data, weather dashboard for corresponding input - card content 

// function init() {
  // When the init function is executed, the code inside renderLastGrade function will also execute
//   renderLastWeather();
// }
// init();
