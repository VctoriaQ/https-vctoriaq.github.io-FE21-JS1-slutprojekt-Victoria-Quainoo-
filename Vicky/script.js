const API_KEY = "30af30e6326a46c9b4c504f1c2ece680"

function submit(){
    var stad = document.getElementById("search").value
    getData(stad)
    getForecast(stad)
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function newImageElement(src){
    var imageElement = document.createElement("IMG");
    imageElement.setAttribute("src", src)
    return imageElement;
}

function newTextElement(text){
    var texElement = document.createElement("p");
    texElement.innerHTML = text
    return texElement;
}

function getForecast(inputCity){
    $.get("https://api.weatherbit.io/v2.0/forecast/daily?",
    {
      key: API_KEY,
      lang: "sv",
      country: "SE",
      city: inputCity
    },
    function(payload, status){
        if(status != "success")
            alert("Något gick fel")
        else{
            for(var i = 1; i < 6; i++){
                const weekday = ["Söndag","Måndag","Tisdag","Onsdag","Torsdag","Fredag","Lördag"];
                var datetime = String(payload.data[i].datetime)
                const d = new Date(datetime);
                let day = weekday[d.getDay()];
                document.getElementById("day" + i).innerText = day

                // Bild
                var bild = String(getWeatherIcon(payload.data[i]))
                document.getElementById("day" + i + "-image").src = bild
    
                // Max Temperatur
                var max_temp = "H: " + String(payload.data[i].max_temp) + "°C"
                document.getElementById("day" + i + "-max-temp").innerText = max_temp

                // Min Temp
                var min_temp = "L: " + String(payload.data[i].min_temp) + "°C"
                document.getElementById("day" + i + "-min-temp").innerText = min_temp

            }
        }
    });
};

function getData(inputCity){
    $.get("https://api.weatherbit.io/v2.0/current?",
    {
      key: API_KEY,
      lang: "sv",
      country: "SE",
      city: inputCity
    },
    function(payload, status){
        if(status != "success")
            alert("Något gick fel")
        else{
            document.getElementById("current-city").innerText = getCity(payload.data[0]);

            // Bild
            var bild = String(getWeatherIcon(payload.data[0]))
            document.getElementById("current-weather-image").src = bild

            // Temperatur
            var temp = String(getTemp(payload.data[0])) + "°C grader"
            document.getElementById("current-temp").innerText = temp

            // Vind hastighet
            var hastighet = "Vind hastighet: " + String(getWindSpeed(payload.data[0])) + " m/s"
            document.getElementById("current-wind").innerText = hastighet

             // Luftfuktighet
            var fuktighet = "Luftfuktighet: " + String(getHumidity(payload.data[0])) + " %"
            document.getElementById("current-humidity").innerText = fuktighet
        }
    });
};

function getCity(data){
    return data.city_name;
} 

function getTemp(data){
    return data.temp;
} 

function getWindSpeed(data){
    return data.wind_spd;
}

function getWeatherIcon(data){
    var weatherIcon = data.weather.icon;
    return "https://www.weatherbit.io/static/img/icons/"+weatherIcon+".png"
} 

// Lufkfuktighet
function getHumidity(data){
    return data.rh;
}
