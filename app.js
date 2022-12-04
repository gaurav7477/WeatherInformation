console.log("Jay Shree Ram");
// ----------------> Grab Elements <---------------------//
let timeDetailsDisplay = document.getElementsByClassName("timeDetailsDisplay");
let temperature = document.getElementById("temperature");
let temperatureMobiles = document.getElementById("temperatureMobiles");
let cityDisplay = document.getElementsByClassName("cityDisplay");
let weatherNature = document.getElementsByClassName("weatherNature");
let weatherNatureImgDisplay = document.getElementsByClassName("weatherNatureImgDisplay");
let humidity = document.getElementById("humidity");
let clouds = document.getElementById("clouds");
let windSpeed = document.getElementById("windSpeed");
let windDirection = document.getElementById("windDirection");
let pressure = document.getElementById("pressure"); 
let timezone = document.getElementById("timezone"); 
let latitude = document.getElementById("latitude"); 
let longitude = document.getElementById("longitude"); 
let country = document.getElementById("country"); 
let cityInputForm = document.getElementById("cityInputForm");
let cityInput = document.getElementById("cityInput");
let container = document.getElementById("container");

// -----------------> Functions <------------------//
function randomNumberGenerator(n)
{
    return Math.floor(Math.random()*(n)+(1));
}

function containerStyle(type,n)
{
    container.style.background = `url(./images/${type}/${type}${randomNumberGenerator(n)}.jpg)`; 
    container.style.backgroundPosition = `center`;
    container.style.backgroundRepeat = `no-repeat`;
    container.style.backgroundSize = `cover`;
    container.style.height = `100vh`;
    container.style.width = `100vw`;
}

function hourAndMinuteSymmetry(digit)
{
    if(digit < 10)
    {
        return `0${digit}`;
    }
    else
    {
        return `${digit}`;
    }
}

function DisplayDetails(data)
{
    // Display Temperature
    let temp = data.main.temp.toString().slice(0,2);
    temperature.innerHTML = `${temp}<span>°</span>`;
    temperatureMobiles.innerHTML = `${temp}<span>°</span>`;

    // Display City
    for(element of cityDisplay)
    {
        element.innerText = `${data.name}`;
    }

    let weatherNatureType = data.weather[0].main;

    // Display Weather Nature
    for(element of weatherNature)
    {
        element.innerText = `${weatherNatureType}`;
    }

    // Display Weather Nature Image
    for(element of weatherNatureImgDisplay)
    {
        if(weatherNatureType == `Thunderstorm`)
        {
            element.src = `./images/icons/weatherNature/thunderstorm.png`;
        }
        else if(weatherNatureType == `Drizzle`)
        {
            element.src = `./images/icons/weatherNature/drizzle.png`;
        }
        else if(weatherNatureType == `Rain`)
        {
            element.src = `./images/icons/weatherNature/rainy-day.png`;
        }
        else if(weatherNatureType == `Snow`)
        {
            element.src = `./images/icons/weatherNature/snowy.png`;
        }
        else if(weatherNatureType == `Mist` || weatherNatureType == `Fog` || weatherNatureType == `Smoke` || weatherNatureType == `Tornado`)
        {
            element.src = `./images/icons/weatherNature/cloudy-day.png`;
        }
        else if(weatherNatureType == `Clear`)
        {
            element.src = `./images/icons/weatherNature/sun.png`;
        }
        else if(weatherNatureType == `Clouds`)
        {
            element.src = `./images/icons/weatherNature/cloudy-day.png`;
        }
        else
        {
            element.src = `./images/icons/weatherNature/cloudy.png`;
        }
    }

    // Random Container background Image
    if(weatherNatureType == `Thunderstorm`)
    {
        containerStyle(`rainy`,5);       
    }
    else if(weatherNatureType == `Drizzle`)
    {
        containerStyle(`rainy`,5);
    }
    else if(weatherNatureType == `Rain`)
    {
        containerStyle(`rainy`,5);
    }
    else if(weatherNatureType == `Snow`)
    {
        containerStyle(`snow`,3);
    }
    else if(weatherNatureType == `Mist` || weatherNatureType == `Fog` || weatherNatureType == `Smoke` || weatherNatureType == `Tornado`)
    {
        containerStyle(`cloudy`,5);
    }
    else if(weatherNatureType == `Clear`)
    {
        containerStyle(`sunny`,4);
    }
    else if(weatherNatureType == `Clouds`)
    {
        containerStyle(`cloudy`,5);
    }
    else
    {
        containerStyle(cloudy,5);
    }

    // Display Weather Details
    humidity.innerText = data.main.humidity;
    clouds.innerText = data.clouds.all;
    windSpeed.innerText = (data.wind.speed*3.6).toString().slice(0,4);
    windDirection.innerText = data.wind.deg;
    pressure.innerText = data.main.pressure;

    // Display Location Details
    timezone.innerText = data.timezone;
    latitude.innerText = data.coord.lat;
    longitude.innerText = data.coord.lon;
    country.innerText = data.sys.country;
}


// -------> Time And Date Menipulation Function<-------//
function timeAndDateManipulation()
{
    let newDate = new Date();
    let date = newDate.getDate();
    
    let monthsArray = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    let month = monthsArray[newDate.getMonth()];  

    let year = newDate.getFullYear().toString().slice(2);

    let dayArray = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day = dayArray[newDate.getDay()];

    let hour = hourAndMinuteSymmetry(newDate.getHours());
    let minutes = hourAndMinuteSymmetry(newDate.getMinutes()) ;    

    for(element of timeDetailsDisplay)
    {
        element.innerHTML = `${hour}:${minutes} - ${day}, ${date} ${month} '${year}`;
    }
}
// Fetching API and Get data
function getWeatherInfo(byCityName,cityName,lat,lon)
{
    let url;

    if(byCityName == true)
    {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=a25833c8c704edfa54057bcc0af4f038&units=metric`;

        fetch(url,{
            method : `GET`,
        }).then(response => response.json())
        .then((data) =>
        { 
            if(data.cod == 200)
            {
                DisplayDetails(data);
            }
            else
            {
                alert(`${data.message}\nEnter Valid City Name`);
            }
        })
    }
    else
    {
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a25833c8c704edfa54057bcc0af4f038`;

        fetch(url,{
            method : `GET`,
        }).then(response => response.json())
        .then((data) =>
        { 
            if(data.cod == 200)
            {
                DisplayDetails(data);
            }
            else
            {
                alert(`${data.message}\nEnter Valid City Name`);
            }
        })
    }
}

function getDetailsOfCities(city)
{
    getWeatherInfo(true,city,null,null);
}

// ---------------------> Time And Date Menipulation <---------------//
timeAndDateManipulation();
setInterval(timeAndDateManipulation, 1000);

// Get Current Location and Display data Accordingly
navigator.geolocation.getCurrentPosition(function(position)
{
    // console.log(position.coords.latitude);
    // console.log(position.coords.longitude);

    getWeatherInfo(false,null,position.coords.latitude,position.coords.longitude);
    
},function()
{
    getWeatherInfo(true,`Bhopal`,null,null);

})

// On Entering any City name
cityInputForm.addEventListener("submit",(e)=>
{
    let city = cityInput.value;
    getDetailsOfCities(city);
    e.preventDefault();
    cityInput.value = ``;
})












































