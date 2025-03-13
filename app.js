function displayInfo(response){
  console.log(response.data)
let temperatureElement=document.querySelector("#Temp");
let temperature= Math.round(response.data.temperature.current);
 let h1= document.querySelector("#current-city");
 let iconElement=document.querySelector("#weatherIcon");
 let conditionElement=document.querySelector("#conditions");
 let humidityElement=document.querySelector("#Humidity");
 let windElement=document.querySelector("#speed");
 let dayElement=document.querySelector("#current-day");
 let date = new Date(response.data.time*1000);

h1.innerHTML=response.data.city;
temperatureElement.innerHTML=temperature;
iconElement.innerHTML = `<img src="${response.data.condition.icon_url}"/>`;
conditionElement.innerHTML=response.data.condition.description;
humidityElement.innerHTML=`${response.data.temperature.humidity}%`;
windElement.innerHTML=`${response.data.wind.speed}km/h`;
dayElement.innerHTML=displayDate(date);

getForecast(response.data.city);
}
function displayDate(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

function searchCity(city){
let apiKey = "c64617d52ffbbt4391487a0eaf99cbbo";
let apiUrl =
  `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
axios.get(apiUrl).then(displayInfo);
}
function displayCity(event){
    event.preventDefault()
    let cityElement=document.querySelector("#input-city");   
    searchCity(cityElement.value)
}

function formatDate(time){
  let now=new Date(time*1000);
  let days=["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return days[now.getDay()];
}
function getForecast(city){
let apiKey = "c64617d52ffbbt4391487a0eaf99cbbo ";
let apiUrl =
  `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
axios.get(apiUrl).then(displayForecast)
}

function displayForecast(response){
let Forecast=document.querySelector("#weatherForecasting")
let ForecastHTML = "";
  response.data.daily.forEach(function(day,index){
    if(index<5){
  ForecastHTML+=`<div class="forecast">
 <div class="forcasting">
 <div class="weather-forcast-day">${formatDate(day.time)}</div>
   <div class="weather-forcast-icon"><img src="${day.condition.icon_url}"/></div>
   <div class="weather-forcast-temp">
    <div class="weather-forcast-max">${Math.round(day.temperature.maximum)}</div>
   <div class="weather-forcast-min">/${Math.round(day.temperature.minimum)}</div>
   </div>
   </div>
    </div>`;
}
});
Forecast.innerHTML =ForecastHTML
};
let Form=document.querySelector("#myform");
Form.addEventListener("submit", displayCity);

