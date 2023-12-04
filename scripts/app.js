import { apiKey } from "./environment.js"

// Define Variables
let userSearch = document.getElementById("userSearch");
let searchBtn = document.getElementById("searchBtn");

let cityName = document.getElementById("cityName");
let currentWeatherIcon = document.getElementById("currentWeatherIcon");
let currentTemp = document.getElementById("currentTemp");
let currentDesc = document.getElementById("currentDesc");
let currentHighLow = document.getElementById("currentHighLow");

let time = document.getElementById("time");
let morningIcon = document.getElementById("morningIcon");
let morningTemp = document.getElementById("morningTemp");
let afternoonIcon = document.getElementById("afternoonIcon");
let afternoonTemp = document.getElementById("afternoonTemp");
let nightIcon = document.getElementById("nightIcon");
let nightTemp = document.getElementById("nightTemp");

let dateDayOne = document.getElementById("dateDayOne");
let dayOneIcon = document.getElementById("dayOneIcon");
let dayOneHighLow = document.getElementById("dayOneHighLow");

let dateDayTwo = document.getElementById("dateDayTwo");
let dayTwoIcon = document.getElementById("dayTwoIcon");
let dayTwoHighLow = document.getElementById("dayTwoHighLow");

let dateDayThree = document.getElementById("dateDayThree");
let dayThreeIcon = document.getElementById("dayThreeIcon");
let dayThreeHighLow = document.getElementById("dayThreeHighLow");

let dateDayFour = document.getElementById("dateDayFour");
let dayFourIcon = document.getElementById("dayFourIcon");
let dayFourHighLow = document.getElementById("dayFourHighLow");

let dateDayFive = document.getElementById("dateDayFive");
let dayFiveIcon = document.getElementById("dayFiveIcon");
let dayFiveHighLow = document.getElementById("dayFiveHighLow");


//Geo location is a built in API that allows the user to share their location upon request

let userLat;
let userLon;

//navigator.geolocation this returns geolocation object
//getCurrentPosition method lets the web app get the current position

navigator.geolocation.getCurrentPosition(success, errorFunc);

//If the user accepts we run success function
async function success(position){
    userLat = position.coords.latitude;
    userLon = position.coords.longitude;
    console.log(userLat, userLon);
    await currentWeatherAPI();
}

//If the user denies we run errorFunc
function errorFunc(error){
    console.log(error.message);
}

//async function allows us to use the key word await, it pauses the execution of the code until the promise is fufilled

async function currentWeatherAPI(){
    //We make a fetch request this is our promise

    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${userLat}&lon=${userLon}&appid=${apiKey}&units=imperial`);
    //wait for our response and parse it into json data
    const data = await promise.json();

    currentTemp.innerText = data.main.temp;
    currentDesc.innerText = data.weather[0].main;
    currentHighLow.innerText = data.main.temp_min + "°F | " + data.main.temp_max + "°F";
    console.log(data.main.temp, data.weather[0].main, data.main.temp_min, data.main.temp_max);
}

// currentWeatherAPI();

async function hourlyWeatherAPI(){
    const promise = await fetch(`api.openweathermap.org/data/2.5/forecast?lat=${userLat}&lon=${userLon}&appid=${apiKey}`);
    const data = await promise.json();
    fiveDayForecast = data;
    console.log(fiveDayForecast.list[4].main.temp);
    // morningTemp.innerText = data.;
}

// hourlyWeatherAPI();