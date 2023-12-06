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

// JavaScript Variables
let userLat, userLon;
let currentWeatherData, hourlyWeatherData;
let high = 0, low = 0;

//Geo location is a built in API that allows the user to share their location upon request



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
    checkHighLow();
    updateDateTime()
    getTodayDate();
}

//If the user denies we run errorFunc
async function errorFunc(error) {
    console.log(error.message);
    userLat = 37.9616;
    userLon = -121.2756;
    // console.log(userLat, userLon);
    await currentWeatherAPI();
    await hourlyWeatherAPI();
    checkHighLow();
    updateDateTime();
    getTodayDate();
}

//async function allows us to use the key word await, it pauses the execution of the code until the promise is fufilled

async function currentWeatherAPI() {
    //We make a fetch request this is our promise

    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${userLat}&lon=${userLon}&appid=${apiKey}&units=imperial`);
    //wait for our response and parse it into json data
    const data = await promise.json();
    currentWeatherData = data;
    console.log(currentWeatherData);
    cityName.innerHTML = currentWeatherData.name;
    // currentWeatherIcon.innerHTML = currentWeatherData.weather[0].icon; //Scale https://openweathermap.org/weather-conditions
    currentTemp.innerHTML = Math.round(currentWeatherData.main.temp);
    currentDesc.innerHTML = currentWeatherData.weather[0].main;
    currentHigh.innerHTML = Math.round(currentWeatherData.main.temp_max);
    currentLow.innerHTML = Math.round(currentWeatherData.main.temp_min);
    
    setIcon(currentWeatherIcon, currentWeatherData.weather[0].main);

    
}

// currentWeatherAPI();

async function hourlyWeatherAPI() {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${userLat}&lon=${userLon}&appid=${apiKey}&units=imperial`);
    const data = await promise.json();
    hourlyWeatherData = data;
    console.log(hourlyWeatherData);
    // TODAY HOURLY
    morningIcon.innerHTML = hourlyWeatherData.list[2].weather[0].icon;
    morningTemp.innerHTML = Math.round(hourlyWeatherData.list[2].main.temp);
    afternoonIcon.innerHTML = hourlyWeatherData.list[3].weather[0].icon;
    afternoonTemp.innerHTML = Math.round(hourlyWeatherData.list[3].main.temp);
    nightIcon.innerHTML = hourlyWeatherData.list[5].weather[0].icon;
    nightTemp.innerHTML = Math.round(hourlyWeatherData.list[5].main.temp);
    // 5 DAY FORECAST
    // dateDayOne.innerHTML = hourlyWeatherData.list[4].dt_txt;
    dayOneIcon.innerHTML = hourlyWeatherData.list[4].weather[0].icon;
    dayOneHigh.innerHTML = Math.round(hourlyWeatherData.list[4].main.temp_max);
    dayOneLow.innerHTML = Math.round(hourlyWeatherData.list[4].main.temp_min);

    // dateDayTwo.innerHTML = hourlyWeatherData.list[12].dt_txt;
    dayTwoIcon.innerHTML = hourlyWeatherData.list[12].weather[0].icon;
    dayTwoHigh.innerHTML = Math.round(hourlyWeatherData.list[12].main.temp_max);
    dayTwoLow.innerHTML = Math.round(hourlyWeatherData.list[12].main.temp_min);

    // dateDayThree.innerHTML = hourlyWeatherData.list[20].dt_txt;
    dayThreeIcon.innerHTML = hourlyWeatherData.list[20].weather[0].icon;
    dayThreeHigh.innerHTML = Math.round(hourlyWeatherData.list[20].main.temp_max);
    dayThreeLow.innerHTML = Math.round(hourlyWeatherData.list[20].main.temp_min);

    // dateDayFour.innerHTML = hourlyWeatherData.list[28].dt_txt;
    dayFourIcon.innerHTML = hourlyWeatherData.list[28].weather[0].icon;
    dayFourHigh.innerHTML = Math.round(hourlyWeatherData.list[28].main.temp_max);
    dayFourLow.innerHTML = Math.round(hourlyWeatherData.list[28].main.temp_min);

    // dateDayFive.innerHTML = hourlyWeatherData.list[36].dt_txt;
    dayFiveIcon.innerHTML = hourlyWeatherData.list[36].weather[0].icon;
    dayFiveHigh.innerHTML = Math.round(hourlyWeatherData.list[36].main.temp_max);
    dayFiveLow.innerHTML = Math.round(hourlyWeatherData.list[36].main.temp_min);
    


}

function setIcon(element, weather) {
    switch (weather) {
        case "Clear":
            element.src = "./assets/clear.png";
            break;
        case "Clouds":
            element.src = "./assets/clouds.png";
            break;
        case "Drizzle":
            element.src = "./assets/rain.png";
            break;
        case "Rain":
            element.src = "./assets/rain.png";
            break;
        case "Snow":
            element.src = "./assets/snowflake.png";
            break;
        case "Thunderstorm":
            element.src = "./assets/thunderstorm.png";
            break;
        default:
            element.src = "./assets/mist.png";
            break;
    }
}

function checkHighLow() {
    for (let i = 0; i < hourlyWeatherData.list.length; i++) {
        if (hourlyWeatherData.list[i].main.temp_max > high) {
            high = hourlyWeatherData.list[i].main.temp_max;
        }
    }
    console.log(high);
}

// hourlyWeatherAPI();

// create a function to update the time
function updateDateTime() {
    // create a new `Date` object
    const now = new Date();

    // get the current time as a string
    const currentDateTime = now.toLocaleTimeString('en-US', { hour: "numeric", minute: "numeric" });

    // update the `innerHTML` property of the element with the `id` of `time`
    document.querySelector("#time").innerHTML = currentDateTime;
}

// call the `updateDateTime` function every second
setInterval(updateDateTime, 1000);

//Date
function getTodayDate() {
    let todayUnix = currentWeatherData.dt;
    let todayDateTime = new Date(todayUnix * 1000);

    let futureDayArray = [];
    for (let i = 1; i < 6; i++) {
        let futureDate = new Date(todayDateTime.setHours(todayDateTime.getHours() + (24)));
        let futureWeekDay = futureDate.toLocaleDateString('en-US', { weekday: "short" }).toUpperCase();
        let futureDay = futureDate.toLocaleDateString('en-US', { month: "2-digit", day: "numeric" }).toUpperCase();
        let futureDayforArr = futureWeekDay + " " + futureDay;
        futureDayArray.push(futureDayforArr);
    }
    dateDayOne.innerHTML = futureDayArray[0];
    dateDayTwo.innerHTML = futureDayArray[1];
    dateDayThree.innerHTML = futureDayArray[2];
    dateDayFour.innerHTML = futureDayArray[3];
    dateDayFive.innerHTML = futureDayArray[4];

    // let futureDate = new Date(todayDateTime.setHours(todayDateTime.getHours()+24));
    // // console.log(futureDate);
    // // dateDayOne.innerHTML = unixDate.toLocaleDateString('en-US', { weekday: "short"}).toUpperCase();
    // let futureWeekDay = futureDate.toLocaleDateString('en-US', { weekday: "short"}).toUpperCase();
    // let futureDay = futureDate.toLocaleDateString('en-US', { month: "2-digit", day: "2-digit" }).toUpperCase();

    // console.log(futureWeekDay + " " + futureDay);

}


