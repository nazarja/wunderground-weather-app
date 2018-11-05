
/*************** CALENDER ******************/

let calender = new Date();
let colorDate = calender.getDate();
let colorDay = calender.getDay();
let colorMonth = calender.getMonth();
let hour = calender.getHours();
let minutes = calender.getMinutes();
let date = document.getElementById('date');
let day = document.getElementById('day');
let month = document.getElementById('month');

if (minutes < 10) {
    minutes = "0" + minutes;
}

// Write the date nums and highlight current date
for (let x = 1; x < 32; x++) {   
    let dates  = '<span>' + x + '</span>';
        if (colorDate == x) {
            dates  = '<span class="colorChange">' + x + '</span>';
        }
    date.innerHTML += dates;   
}

// Write the day and highlight current day
const dayArr = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

for (let x = 0; x < dayArr.length; x++) {
    let days  = '<span>' + dayArr[x] + '</span>';
        if (colorDay == x) {
            days  = '<span class="colorChange">' + dayArr[x] + '</span>';
        }
    day.innerHTML += days;
}

// Write the month and highlight current month
const monthArr = ['January','Febuary','March','April','May','June','July','August','September','October','November','December'];

for (let x = 0; x < monthArr.length; x++) {
    let months  = '<span>' + monthArr[x] + '</span>';
        if (colorMonth == x) {
            months  = '<span class="colorChange">' + monthArr[x] + '</span>';
        }
    month.innerHTML += months;
}



/*************** Variable Declarations ******************/

// Select elements and assign to variables
let unitChange = document.getElementById("switch"); 
let colorChange = document.querySelectorAll(".colorChange");
let units = document.querySelectorAll(".units");
let metric = document.querySelectorAll(".metric");
let imperial = document.querySelectorAll(".imperial");

// Add Event Listener to the switch and control function calls relative
unitChange.addEventListener("click", function() {
        hourlyForecast = "";
        unitColorChange();
        unitCheck();
});

/*************** Color Change ******************/

// Check state of switch and make calls relative to its state
function unitColorChange() {
    // Metric State == False/Unchecked
    if (!unitChange.checked) {
        for (let i = 0; i < colorChange.length; i++) {
            colorChange[i].style.color = "#2196F3";
        } 
        for (let i = 0; i < units.length / 2 - 1; i++) {
            metric[i].style.color = "#2196F3";
            imperial[i].style.color = "#ccc";
        }   
    }
    // Imperial State == True/Checked
    else {
        for (let i = 0; i < colorChange.length; i++) {
            colorChange[i].style.color = "#F32121";
        }
        for (let i = 0; i < units.length / 2 - 1; i++) {
            metric[i].style.color = "#ccc";
            imperial[i].style.color = "#F32121";
        }  
    }
}
unitColorChange();

/*************** JSON FILE REQUEST ******************/
let weather = "";
let showLocal = document.getElementById("show-local-weather");
let searchBox = document.getElementById("search");
searchBox.value = "";
let cityCur = document.getElementById("cityCur");
let iconCur = document.getElementById("iconCur");
let weatherCur = document.getElementById("weatherCur");
let tempCur = document.getElementById("tempCur");
let feelsLikeCur = document.getElementById("feelsLikeCur");
let windCur = document.getElementById("windCur");
let windDir =  "";
let rainCur = document.getElementById("rainCur");
let rainChance = "";
let uvCur = document.getElementById("uvCur");
let sun = document.getElementById("sun");
let moon = document.getElementById("moon");
let amPM = "";
let weekday1 = document.getElementById("weekday1");
let weekday2 = document.getElementById("weekday2");
let weekday3 = document.getElementById("weekday3");
let hourlyForecast = document.getElementById("hourly-forecast");
let isMetric_English = document.querySelectorAll(".metric_english");
let weekdayicon1 = document.getElementById("weekdayicon1");
let weekdayicon2 = document.getElementById("weekdayicon2");
let weekdayicon3 = document.getElementById("weekdayicon3");
let weekdaytext1 = document.getElementById("weekdaytext1");
let weekdaytext2 = document.getElementById("weekdaytext2");
let weekdaytext3 = document.getElementById("weekdaytext3");
let weekDayText = document.querySelectorAll(".weekDayText");

// If local weather icon pressed call local autoip
showLocal.addEventListener("click", function () {
    xhr();
    unitCheck();
    unitColorChange();
});

// Prevent default submit action and capture search location request
document.querySelector('form.searchBox').addEventListener('submit', function (e) {
    //prevent the normal submission of the form
    e.preventDefault();
    searchLocation();    
});

/**** Search XHR REQUEST ****/
let finalSearch = "";
let searchXHR = 0;
let autoXHR = 1;
// Get Location from Search Box
function searchLocation() {

    let address = []
    address = searchBox.value;
    address = address.replace(",", "");
    address = address.split(" ");
    if (address.length == 1 || address.length >= 4) {
        searchBox.value = 'Error: Paris, France.. Seattle, WA..'
        xhr();
        return false;
    }
    if (address.length == 3) {
        let temp = address[0];
        address[0] = address[1];
        address[1] = temp;
    }

    address.reverse();
    address.splice(1, 0, "/");
    address = address.join("");
    finalSearch = address;

    // Change xhr values
    searchXHR = 1;
    autoXHR = 0;
    xhr(); 
    // Reset Value of Search Box
    searchBox.value = ""; 
}

/**** Auto XHR REQUEST ****/
function xhr() {
let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
    weather = JSON.parse(xhr.responseText);

        // Current Weather Condition
         cityCur.innerHTML = '<img src="icons/map-marker.png" class="show-local-weather">' + weather.current_observation.display_location.full;
         weatherCur.innerHTML = weather.hourly_forecast[0].condition;
         windDir = weather.current_observation.wind_dir.toLowerCase();
         rainChance = "Chance of Rain: " + weather.forecast.simpleforecast.forecastday[0].pop + " <i class='wi wi-humidity'></i>";
         uvCur.innerHTML = "<i class='wi wi-day-sunny sun'></i> uv: " + weather.current_observation.UV;
         sun.innerHTML = "<i class='wi wi-horizon sun'></i> Sunrise: " + weather.sun_phase.sunrise.hour + ":" + weather.sun_phase.sunrise.minute
                         + " <i class='wi wi-horizon-alt sun'></i> Sunset: " + weather.sun_phase.sunset.hour + ":" + weather.sun_phase.sunset.minute;
         moon.innerHTML = "<i class='wi wi-moonrise moon'></i> Moonrise: " + weather.moon_phase.moonrise.hour + ":" + weather.moon_phase.moonrise.minute
                         +" <i class='wi wi-moonset moon'></i> Moonset: " + weather.moon_phase.moonset.hour + ":" + weather.moon_phase.moonset.minute;
            
        /**** Hourly Forecast - Iterate through and create div's ****/ 
        
        let hourly = weather.hourly_forecast.length / 3;
        hourlyForecast.innerHTML = "";
        for (let i = 0; i < hourly; i++) {
            
            
            let hf = '<div class="hourly-forecast">'; 
                hf+= '<span class="inside-hourly">'+weather.hourly_forecast[i].FCTTIME.hour+" "+weather.hourly_forecast[i].FCTTIME.ampm.toLowerCase()+'</span>'; // hour
                hf+= '<span class="inside-hourly"><img src="https://icons.wxug.com/i/c/v2/' + weather.hourly_forecast[i].icon + '.svg"></span>'; // icon
                hf+= '<span class="inside-hourly metric_english">'+weather.hourly_forecast[i].temp.metric+'&deg;C</span>'; // temp
                hf+= '<span class="inside-hourly">'+weather.hourly_forecast[i].condition+'</span>'; // description
                hf+= '</div>';
            hourlyForecast.innerHTML += hf;
        }
        // Capture all metric temperature in hourly forecast
        isMetric_English = document.querySelectorAll(".metric_english");
        weekDayText = document.querySelectorAll(".weekDayText");


        // 3 Day Forecast
        weekday1.innerHTML = weather.forecast.simpleforecast.forecastday[1].date.weekday; 
        weekdayicon1.innerHTML = '<img src="https://icons.wxug.com/i/c/v2/' + weather.forecast.simpleforecast.forecastday[1].icon + '.svg">'; 
        weekday2.innerHTML = weather.forecast.simpleforecast.forecastday[2].date.weekday;
        weekdayicon2.innerHTML = '<img src="https://icons.wxug.com/i/c/v2/' + weather.forecast.simpleforecast.forecastday[2].icon + '.svg">';
        weekday3.innerHTML = weather.forecast.simpleforecast.forecastday[3].date.weekday;
        weekdayicon3.innerHTML = '<img src="https://icons.wxug.com/i/c/v2/' + weather.forecast.simpleforecast.forecastday[3].icon + '.svg">';
        weekdaytext1.innerHTML = weather.forecast.txt_forecast.forecastday[2].fcttext_metric;
        weekdaytext2.innerHTML = weather.forecast.txt_forecast.forecastday[4].fcttext_metric;
        weekdaytext3.innerHTML = weather.forecast.txt_forecast.forecastday[6].fcttext_metric;

        /**** Check if night time and show nt icon if true ****/ 
        let time = hour.toString() + minutes.toString();
        time = parseInt(time);
        let sunrise = weather.sun_phase.sunrise.hour + weather.sun_phase.sunrise.minute;
        sunrise = parseInt(sunrise);
        let sunset = weather.sun_phase.sunset.hour + weather.sun_phase.sunset.minute;
        sunset = parseInt(sunset);
       
        if (time > sunrise && time < sunset) {
            iconCur.innerHTML = "<img src='https://icons.wxug.com/i/c/v2/" + weather.hourly_forecast[0].icon + ".svg'>";
        }
        else if (time < sunrise && time > sunset){
            iconCur.innerHTML = "<img src='https://icons.wxug.com/i/c/v2/nt_" + weather.hourly_forecast[0].icon + ".svg'>";
        }
        else {
            iconCur.innerHTML = "<img src='https://icons.wxug.com/i/c/v2/" + weather.hourly_forecast[0].icon + ".svg'>";
        }

        /**** Check if Location is accessed in the US and show Imperial if true ****/
        if (weather.current_observation.display_location.country == "US") {
            unitChange.checked = true;
        }
        else {
            unitChange.checked = false;
        }
        unitCheck();
        unitColorChange();
    }
}
if (autoXHR == 1) {
    xhr.open('GET', 'http://api.wunderground.com/api/5c61c4ba5bc983ee/conditions/astronomy/forecast/hourly/q/autoip.json', true);
    xhr.send();
}
else if (searchXHR == 1) {
    xhr.open('GET', 'http://api.wunderground.com/api/5c61c4ba5bc983ee/conditions/astronomy/forecast/hourly/q/' + finalSearch +'.json', true);
    xhr.send();
}

// reset xhr values
searchXHR = 0;
autoXHR = 1;

}
xhr();

/***************Metric / Imperial UNITS ******************/

// Check state of switch and make calls relative to its state
function unitCheck() {
    // Metric State == False/Unchecked
    if (!unitChange.checked) {
            tempCur.innerHTML = weather.current_observation.temp_c + '<span class="units metric"> &deg;C</span>';
            feelsLikeCur.innerHTML = "feels like <span style='color: #FDB82E'>" + weather.current_observation.feelslike_c + " &deg;C";
            windCur.innerHTML = "<h3><i class='wi wi-strong-wind'></i> Wind</h3>Direction: " + weather.current_observation.wind_dir 
                              + " <i class='windDirC wi wi-wind wi-towards-" + windDir + "'></i>" + "<br />Speed: " 
                              + weather.current_observation.wind_kph +"<span class='windSpeedC'> kph</span>";
            rainCur.innerHTML = "<h3><i class='wi wi-umbrella'></i> Rain</h3>" + "Precipitation: " 
                             + weather.current_observation.precip_today_metric +" <span class='rainCurP'>mm</span><br />"+ rainChance;
            
            for (let i = 0; i < isMetric_English.length; i++) {
                isMetric_English[i].innerHTML = '<span class="inside-hourly metric_english">'+weather.hourly_forecast[i].temp.metric+'&deg;C</span>';
            }
            weekdaytext1.innerHTML = weather.forecast.txt_forecast.forecastday[2].fcttext_metric;
            weekdaytext2.innerHTML = weather.forecast.txt_forecast.forecastday[4].fcttext_metric;
            weekdaytext3.innerHTML = weather.forecast.txt_forecast.forecastday[6].fcttext_metric;
           
    }
    // Imperial State == True/Checked
    else {
            tempCur.innerHTML = weather.current_observation.temp_f + '<span class="imperial units"> &deg;F</span>';
            feelsLikeCur.innerHTML = "feels like <span style='color: #FDB82E'>" + weather.current_observation.feelslike_f + " &deg;F";
            windCur.innerHTML = "<h3><i class='wi wi-strong-wind'></i> Wind</h3>Direction: " + weather.current_observation.wind_dir 
                              + " <i class='windDirC wi wi-wind wi-towards-" + windDir + "'></i>" + "<br />Speed: " 
                              + weather.current_observation.wind_mph +"<span class='windSpeedC'> mph</span>";
            rainCur.innerHTML = "<h3><i class='wi wi-umbrella'></i> Rain</h3>" + "Precipitation: " 
                             + weather.current_observation.precip_today_in +" <span class='rainCurP'>in</span><br />"+ rainChance;
            
            for (let i = 0; i < isMetric_English.length; i++) {
                isMetric_English[i].innerHTML = '<span class="inside-hourly metric_english">'+weather.hourly_forecast[i].temp.english+'&deg;F</span>';
            }
            weekdaytext1.innerHTML = weather.forecast.txt_forecast.forecastday[2].fcttext;
            weekdaytext2.innerHTML = weather.forecast.txt_forecast.forecastday[4].fcttext;
            weekdaytext3.innerHTML = weather.forecast.txt_forecast.forecastday[6].fcttext;
            
    }
}

/*************** Units ******************/

/**** Unit Switcher ****/
metric[0].addEventListener("click", function() {
    unitChange.checked = false;
    unitCheck();
    unitColorChange();
});
imperial[0].addEventListener("click", function() {
    unitChange.checked = true;   
    unitCheck();
    unitColorChange();
});

/**** Temperature ****/
metric[1].addEventListener("click", function() {
        metric[1].style.color = "#2196F3";
        imperial[1].style.color = "#ccc";
        tempCur.innerHTML = weather.current_observation.temp_c + " &deg;C";
        feelsLikeCur.innerHTML = "feels like <span style='color: #FDB82E'>" + weather.current_observation.feelslike_c + " &deg;C";
        for (let i = 0; i < isMetric_English.length; i++) {
                isMetric_English[i].innerHTML = '<span class="inside-hourly metric_english">'+weather.hourly_forecast[i].temp.metric+'&deg;C</span>';
        }
        
});
imperial[1].addEventListener("click", function() {
        metric[1].style.color = "#ccc";
        imperial[1].style.color = "#F32121";
        tempCur.innerHTML = weather.current_observation.temp_f + " &deg;F";
        feelsLikeCur.innerHTML = "feels like <span style='color: #FDB82E'>" + weather.current_observation.feelslike_f + " &deg;F";
        for (let i = 0; i < isMetric_English.length; i++) {
                isMetric_English[i].innerHTML = '<span class="inside-hourly metric_english">'+weather.hourly_forecast[i].temp.english+'&deg;F</span>';
        }
        
});

/**** Wind Speed ****/
metric[2].addEventListener("click", function() {
        metric[2].style.color = "#2196F3";
        imperial[2].style.color = "#ccc";
        windCur.innerHTML = "<h3><i class='wi wi-strong-wind'></i> Wind</h3>Direction: " + weather.current_observation.wind_dir 
                              + " <i class='windDirC wi wi-wind wi-towards-" + windDir + "'></i>" + "<br />Speed: " 
                              + weather.current_observation.wind_kph +"<span class='windSpeedC'> kph</span>";
});
imperial[2].addEventListener("click", function() {
        metric[2].style.color = "#ccc";
        imperial[2].style.color = "#F32121";
        windCur.innerHTML = "<h3><i class='wi wi-strong-wind'></i> Wind</h3>Direction: " + weather.current_observation.wind_dir 
                              + " <i class='windDirC wi wi-wind wi-towards-" + windDir + "'></i>" + "<br />Speed: " 
                              + weather.current_observation.wind_mph +"<span class='windSpeedC'> mph</span>";
});

/**** Rain Fall ****/
metric[3].addEventListener("click", function() {
        metric[3].style.color = "#2196F3";
        imperial[3].style.color = "#ccc";
        rainCur.innerHTML = "<h3><i class='wi wi-umbrella'></i> Rain</h3>" + "Precipitation: " 
                             + weather.current_observation.precip_today_metric +" <span class='rainCurP'>mm</span><br />"+ rainChance;
});
imperial[3].addEventListener("click", function() {
        metric[3].style.color = "#ccc";
        imperial[3].style.color = "#F32121";
        rainCur.innerHTML = "<h3><i class='wi wi-umbrella'></i> Rain</h3>" + "Precipitation: " 
                             + weather.current_observation.precip_today_in +" <span class='rainCurP'>in</span><br />"+ rainChance;
});















