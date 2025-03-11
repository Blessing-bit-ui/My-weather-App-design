function displayInfo(response){
  console.log(response.data)
let temperatureElement=document.querySelector("#Temp");
let temperature= Math.round(response.data.temperature.current);
 let h1= document.querySelector("#current-city");
 let iconElement=document.querySelector("#weatherIcon");
 
 
h1.innerHTML=response.data.city;
temperatureElement.innerHTML=temperature;
iconElement.innerHTML = `<img src="${response.data.condition.icon_url}"/>`;
 


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
let Form=document.querySelector("#myform");
Form.addEventListener("submit", displayCity);
