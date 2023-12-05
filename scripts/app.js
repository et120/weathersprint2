import { apiKey } from "./environment.js"

// Define Variables
let userSearch = document.getElementById("userSearch");
let searchBtn = document.getElementById("searchBtn");

let cityName = document.getElementById("cityName");
let currentWeatherIcon = document.getElementById("currentWeatherIcon");
let currentTemp = document.getElementById("currentTemp");
let currentDesc = document.getElementById("currentDesc");
let currentHigh = document.getElementById("currentHigh");
let currentLow = document.getElementById("currentLow");

// let time = document.getElementById("time");
let morningIcon = document.getElementById("morningIcon");
let morningTemp = document.getElementById("morningTemp");
let afternoonIcon = document.getElementById("afternoonIcon");
let afternoonTemp = document.getElementById("afternoonTemp");
let nightIcon = document.getElementById("nightIcon");
let nightTemp = document.getElementById("nightTemp");

let dateDayOne = document.getElementById("dateDayOne");
let dayOneIcon = document.getElementById("dayOneIcon");
let dayOneHigh = document.getElementById("dayOneHigh");
let dayOneLow = document.getElementById("dayOneLow");

let dateDayTwo = document.getElementById("dateDayTwo");
let dayTwoIcon = document.getElementById("dayTwoIcon");
let dayTwoHigh = document.getElementById("dayTwoHigh");
let dayTwoLow = document.getElementById("dayTwoLow");

let dateDayThree = document.getElementById("dateDayThree");
let dayThreeIcon = document.getElementById("dayThreeIcon");
let dayThreeHigh = document.getElementById("dayThreeHigh");
let dayThreeLow = document.getElementById("dayThreeLow");

let dateDayFour = document.getElementById("dateDayFour");
let dayFourIcon = document.getElementById("dayFourIcon");
let dayFourHigh = document.getElementById("dayFourHigh");
let dayFourLow = document.getElementById("dayFourLow");

let dateDayFive = document.getElementById("dateDayFive");
let dayFiveIcon = document.getElementById("dayFiveIcon");
let dayFiveHigh = document.getElementById("dayFiveHigh");
let dayFiveLow = document.getElementById("dayFiveLow");


//Geo location is a built in API that allows the user to share their location upon request

let userLat;
let userLon;

//navigator.geolocation this returns geolocation object
//getCurrentPosition method lets the web app get the current position

navigator.geolocation.getCurrentPosition(success, errorFunc);

//If the user accepts we run success function
async function success(position) {
    userLat = position.coords.latitude;
    userLon = position.coords.longitude;
    console.log(userLat, userLon);
    await currentWeatherAPI();
    await hourlyWeatherAPI();
}

//If the user denies we run errorFunc
async function errorFunc(error) {
    console.log(error.message);
    userLat = 37.9616;
    userLon = -121.2756;
    // console.log(userLat, userLon);
    await currentWeatherAPI();
    await hourlyWeatherAPI();
}

//async function allows us to use the key word await, it pauses the execution of the code until the promise is fufilled

async function currentWeatherAPI() {
    //We make a fetch request this is our promise

    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${userLat}&lon=${userLon}&appid=${apiKey}&units=imperial`);
    //wait for our response and parse it into json data
    const data = await promise.json();

    cityName.innerHTML = data.name;
    currentWeatherIcon.innerHTML = data.weather[0].icon; //Scale https://openweathermap.org/weather-conditions
    currentTemp.innerHTML = Math.round(data.main.temp);
    currentDesc.innerHTML = data.weather[0].main;
    currentHigh.innerHTML = Math.round(data.main.temp_max);
    currentLow.innerHTML = Math.round(data.main.temp_min);

    console.log(data.name, data.weather[0].id, data.main.temp, data.weather[0].main, data.main.temp_min, data.main.temp_max);
}

// currentWeatherAPI();

async function hourlyWeatherAPI() {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${userLat}&lon=${userLon}&appid=${apiKey}&units=imperial`);
    const data = await promise.json();
    console.log(data);
    // TODAY HOURLY
    morningIcon.innerHTML = data.list[2].weather[0].icon;
    morningTemp.innerHTML = Math.round(data.list[2].main.temp);
    afternoonIcon.innerHTML = data.list[3].weather[0].icon;
    afternoonTemp.innerHTML = Math.round(data.list[3].main.temp);
    nightIcon.innerHTML = data.list[5].weather[0].icon;
    nightTemp.innerHTML = Math.round(data.list[5].main.temp);
    // 5 DAY FORECAST
    dateDayOne.innerHTML = data.list[4].dt_txt;
    dayOneIcon.innerHTML = data.list[4].weather[0].icon;
    dayOneHigh.innerHTML = Math.round(data.list[4].main.temp_max);
    dayOneLow.innerHTML = Math.round(data.list[4].main.temp_min);

    dateDayTwo.innerHTML = data.list[12].dt_txt;
    dayTwoIcon.innerHTML = data.list[12].weather[0].icon;
    dayTwoHigh.innerHTML = Math.round(data.list[12].main.temp_max);
    dayTwoLow.innerHTML = Math.round(data.list[12].main.temp_min);

    dateDayThree.innerHTML = data.list[20].dt_txt;
    dayThreeIcon.innerHTML = data.list[20].weather[0].icon;
    dayThreeHigh.innerHTML = Math.round(data.list[20].main.temp_max);
    dayThreeLow.innerHTML = Math.round(data.list[20].main.temp_min);

    dateDayFour.innerHTML = data.list[28].dt_txt;
    dayFourIcon.innerHTML = data.list[28].weather[0].icon;
    dayFourHigh.innerHTML = Math.round(data.list[28].main.temp_max);
    dayFourLow.innerHTML = Math.round(data.list[28].main.temp_min);

    dateDayFive.innerHTML = data.list[36].dt_txt;
    dayFiveIcon.innerHTML = data.list[36].weather[0].icon;
    dayFiveHigh.innerHTML = Math.round(data.list[36].main.temp_max);
    dayFiveLow.innerHTML = Math.round(data.list[36].main.temp_min);
}

// hourlyWeatherAPI();

// create a function to update the time
function updateDateTime() {
    // create a new `Date` object
    const now = new Date();

    // get the current time as a string
    const currentDateTime = now.toLocaleTimeString();

    // update the `innerHTML` property of the element with the `id` of `time`
    document.querySelector("#time").innerHTML = currentDateTime;
}

// call the `updateDateTime` function every second
setInterval(updateDateTime, 1000);