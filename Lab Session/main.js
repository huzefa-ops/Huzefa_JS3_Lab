//Information about the server and public key
const api={
    base: "https://api.openweathermap.org/data/2.5/",
    key: "b3dde4c1452563a5b38059bf273ee822"
};

//fetch data from weather api according to search
function getResults(query){
    //https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
    fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
    .then(weather => {
        
        //weather object contains information in string format which we need o convert in json
        return weather.json();
    }).then((response)=>{
        console.log(response)

        //funstion to display all information on html page
        displayResult(response)});
}

//add key event on searchbox on pressiong enter it will call getResult
const searchbox=document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt){
    if(evt.keyCode==13)
    getResults(searchbox.value);
}

function displayResult(weather){
    let city= document.querySelector(".location .city");
    city.innerText=`${weather.name},${weather.sys.country}`;

    let date = document.querySelector(".date")
    date.innerText=dateBuilder();

    let temp = document.querySelector(".temp")
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function dateBuilder(){
    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let d=new Date();
let day= days[d.getDay()];
let date=d.getDate();
let month=months[d.getMonth()];
let year=d.getFullYear();

return `${day} ${date} ${month} ${year}`;
}