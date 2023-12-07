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
let currentWeatherData, locationData, hourlyWeatherData;
let high = 0, low = 0;
let todayUnix, todayDateTime, futureDate1, futureDate2, futureDate3, futureDate4, futureDate5;

//Geo location is a built in API that allows the user to share their location upon request
navigator.geolocation.getCurrentPosition(success, errorFunc);

//If the user accepts we run success function
async function success(position) {

    if(userSearch.value){
        const promise = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${userSearch.value}&limit=5&appid=${apiKey}`);
        const data = await promise.json();
        userLat = data[0].lat;
        userLon = data[0].lon;
    }
    else{
        userLat = position.coords.latitude;
        userLon = position.coords.longitude;
    }

    await currentWeatherAPI();
    await hourlyWeatherAPI();
    await reverseGeoAPI();
    updateDateTime();
    getTodayDate();
    hourlyForecast();
}

//If the user denies we run errorFunc
async function errorFunc(error) {
    console.log(error.message);
    userLat = 37.9616;
    userLon = -121.2756;
    // console.log(userLat, userLon);
    await currentWeatherAPI();
    await hourlyWeatherAPI();
    await reverseGeoAPI();
    updateDateTime();
    getTodayDate();
    hourlyForecast();
}

//async function allows us to use the key word await, it pauses the execution of the code until the promise is fufilled
async function currentWeatherAPI() {
    //We make a fetch request this is our promise
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${userLat}&lon=${userLon}&appid=${apiKey}&units=imperial`);
    //wait for our response and parse it into json data
    const data = await promise.json();

    currentWeatherData = data;
    console.log(currentWeatherData);

    currentTemp.innerHTML = Math.round(currentWeatherData.main.temp);
    currentDesc.innerHTML = currentWeatherData.weather[0].main;
    currentHigh.innerHTML = Math.round(currentWeatherData.main.temp_max);
    currentLow.innerHTML = Math.round(currentWeatherData.main.temp_min);

    setIcon(currentWeatherIcon, currentWeatherData.weather[0].main);


}

async function reverseGeoAPI() {
    const location = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${userLat}&lon=${userLon}&limit=5&appid=${apiKey}`)
    const data = await location.json();
    locationData = data;
    console.log(locationData);
    cityName.innerHTML = locationData[0].name.toUpperCase();
}

async function hourlyWeatherAPI() {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${userLat}&lon=${userLon}&appid=${apiKey}&units=imperial`);
    const data = await promise.json();

    hourlyWeatherData = data;
    console.log(hourlyWeatherData);

    // TODAY HOURLY

    setIcon(morningIcon, hourlyWeatherData.list[2].weather[0].main);
    morningTemp.innerHTML = Math.round(hourlyWeatherData.list[2].main.temp);

    setIcon(afternoonIcon, hourlyWeatherData.list[3].weather[0].main);
    afternoonTemp.innerHTML = Math.round(hourlyWeatherData.list[3].main.temp);

    setIcon(nightIcon, hourlyWeatherData.list[5].weather[0].main);
    nightTemp.innerHTML = Math.round(hourlyWeatherData.list[5].main.temp);

    // // 5 DAY FORECAST
    // // dateDayOne.innerHTML = hourlyWeatherData.list[4].dt_txt;
    // dayOneIcon.innerHTML = hourlyWeatherData.list[4].weather[0].icon;
    // dayOneHigh.innerHTML = Math.round(hourlyWeatherData.list[4].main.temp_max);
    // dayOneLow.innerHTML = Math.round(hourlyWeatherData.list[4].main.temp_min);

    // // dateDayTwo.innerHTML = hourlyWeatherData.list[12].dt_txt;
    // dayTwoIcon.innerHTML = hourlyWeatherData.list[12].weather[0].icon;
    // dayTwoHigh.innerHTML = Math.round(hourlyWeatherData.list[12].main.temp_max);
    // dayTwoLow.innerHTML = Math.round(hourlyWeatherData.list[12].main.temp_min);

    // // dateDayThree.innerHTML = hourlyWeatherData.list[20].dt_txt;
    // dayThreeIcon.innerHTML = hourlyWeatherData.list[20].weather[0].icon;
    // dayThreeHigh.innerHTML = Math.round(hourlyWeatherData.list[20].main.temp_max);
    // dayThreeLow.innerHTML = Math.round(hourlyWeatherData.list[20].main.temp_min);

    // // dateDayFour.innerHTML = hourlyWeatherData.list[28].dt_txt;
    // dayFourIcon.innerHTML = hourlyWeatherData.list[28].weather[0].icon;
    // dayFourHigh.innerHTML = Math.round(hourlyWeatherData.list[28].main.temp_max);
    // dayFourLow.innerHTML = Math.round(hourlyWeatherData.list[28].main.temp_min);

    // // dateDayFive.innerHTML = hourlyWeatherData.list[36].dt_txt;
    // dayFiveIcon.innerHTML = hourlyWeatherData.list[36].weather[0].icon;
    // dayFiveHigh.innerHTML = Math.round(hourlyWeatherData.list[36].main.temp_max);
    // dayFiveLow.innerHTML = Math.round(hourlyWeatherData.list[36].main.temp_min);



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
    todayUnix = currentWeatherData.dt;
    todayDateTime = new Date(todayUnix * 1000);

    futureDate1 = new Date(todayDateTime.setHours(todayDateTime.getHours() + (24)));
    futureDate2 = new Date(todayDateTime.setHours(todayDateTime.getHours() + (24)));
    futureDate3 = new Date(todayDateTime.setHours(todayDateTime.getHours() + (24)));
    futureDate4 = new Date(todayDateTime.setHours(todayDateTime.getHours() + (24)));
    futureDate5 = new Date(todayDateTime.setHours(todayDateTime.getHours() + (24)));

    // let futureDayArray = [];
    // for (let i = 1; i < 6; i++) {
    //     let futureDate = new Date(todayDateTime.setHours(todayDateTime.getHours() + (24)));
    //     let futureWeekDay = futureDate.toLocaleDateString('en-US', { weekday: "short" }).toUpperCase();
    //     let futureDay = futureDate.toLocaleDateString('en-US', { month: "2-digit", day: "numeric" }).toUpperCase();
    //     let futureDayforArr = futureWeekDay + " " + futureDay;
    //     futureDayArray.push(futureDayforArr);
    // }
    dateDayOne.innerHTML = futureDate1.toLocaleDateString('en-US', { weekday: "short" }).toUpperCase() + " " + futureDate1.toLocaleDateString('en-US', { month: "2-digit", day: "numeric" }).toUpperCase();
    dateDayTwo.innerHTML = futureDate2.toLocaleDateString('en-US', { weekday: "short" }).toUpperCase() + " " + futureDate2.toLocaleDateString('en-US', { month: "2-digit", day: "numeric" }).toUpperCase();
    dateDayThree.innerHTML = futureDate3.toLocaleDateString('en-US', { weekday: "short" }).toUpperCase() + " " + futureDate3.toLocaleDateString('en-US', { month: "2-digit", day: "numeric" }).toUpperCase();
    dateDayFour.innerHTML = futureDate4.toLocaleDateString('en-US', { weekday: "short" }).toUpperCase() + " " + futureDate4.toLocaleDateString('en-US', { month: "2-digit", day: "numeric" }).toUpperCase();
    dateDayFive.innerHTML = futureDate5.toLocaleDateString('en-US', { weekday: "short" }).toUpperCase() + " " + futureDate5.toLocaleDateString('en-US', { month: "2-digit", day: "numeric" }).toUpperCase();

}

function hourlyForecast() {
    let highDay1 = [], highDay2 = [], highDay3 = [], highDay4 = [], highDay5 = [];
    let lowDay1 = [], lowDay2 = [], lowDay3 = [], lowDay4 = [], lowDay5 = [];
    let weatherDay1 = [], weatherDay2 = [], weatherDay3 = [], weatherDay4 = [], weatherDay5 = [];

    for (let i = 0; i < hourlyWeatherData.list.length; i++) {
        let unixFutureTime = new Date(hourlyWeatherData.list[i].dt * 1000)
        if (unixFutureTime.toLocaleDateString('default') === futureDate1.toLocaleDateString('default')) {
            highDay1.push(hourlyWeatherData.list[i].main.temp_max)
            lowDay1.push(hourlyWeatherData.list[i].main.temp_min)
            weatherDay1.push(hourlyWeatherData.list[i].weather[0].main)
        }
        else if (unixFutureTime.toLocaleDateString('default') === futureDate2.toLocaleDateString('default')) {
            highDay2.push(hourlyWeatherData.list[i].main.temp_max)
            lowDay2.push(hourlyWeatherData.list[i].main.temp_min)
            weatherDay2.push(hourlyWeatherData.list[i].weather[0].main)
        }
        else if (unixFutureTime.toLocaleDateString('default') === futureDate3.toLocaleDateString('default')) {
            highDay3.push(hourlyWeatherData.list[i].main.temp_max)
            lowDay3.push(hourlyWeatherData.list[i].main.temp_min)
            weatherDay3.push(hourlyWeatherData.list[i].weather[0].main)
        }
        else if (unixFutureTime.toLocaleDateString('default') === futureDate4.toLocaleDateString('default')) {

            highDay4.push(hourlyWeatherData.list[i].main.temp_max)
            lowDay4.push(hourlyWeatherData.list[i].main.temp_min)
            weatherDay4.push(hourlyWeatherData.list[i].weather[0].main)
        }
        else if (unixFutureTime.toLocaleDateString('default') === futureDate5.toLocaleDateString('default')) {
            highDay5.push(hourlyWeatherData.list[i].main.temp_max)
            lowDay5.push(hourlyWeatherData.list[i].main.temp_min)
            weatherDay5.push(hourlyWeatherData.list[i].weather[0].main)
        }
    }

    setIcon(dayOneIcon, weatherDay1[0]);
    dayOneHigh.innerHTML = `${Math.round(Math.max(...highDay1))}`;
    dayOneLow.innerHTML = `${Math.round(Math.min(...lowDay1))}`;

    setIcon(dayTwoIcon, weatherDay2[0]);
    dayTwoHigh.innerHTML = `${Math.round(Math.max(...highDay2))}`;
    dayTwoLow.innerHTML = `${Math.round(Math.min(...lowDay2))}`;

    setIcon(dayThreeIcon, weatherDay3[0]);
    dayThreeHigh.innerHTML = `${Math.round(Math.max(...highDay3))}`;
    dayThreeLow.innerHTML = `${Math.round(Math.min(...lowDay3))}`;

    setIcon(dayFourIcon, weatherDay4[0]);
    dayFourHigh.innerHTML = `${Math.round(Math.max(...highDay4))}`;
    dayFourLow.innerHTML = `${Math.round(Math.min(...lowDay4))}`;

    setIcon(dayFiveIcon, weatherDay5[0]);
    dayFiveHigh.innerHTML = `${Math.round(Math.max(...highDay5))}`;
    dayFiveLow.innerHTML = `${Math.round(Math.min(...lowDay5))}`;
}

//Search
userSearch.addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        success(userSearch.value)
        e.preventDefault();
        return false;
    }
});
searchBtn.addEventListener('click', function () {
    success(userSearch.value);
});