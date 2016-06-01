var getForecastButton = document.getElementById('getForecastButton');
  getForecastButton.addEventListener('click', function (event) {

    event.preventDefault();

    var cityInput = document.getElementById('cityInput');

    var countryInput = document.getElementById('countryInput');

    var oReq = new XMLHttpRequest();
    oReq.addEventListener('load', reqListener);
    oReq.open('GET', "http://api.openweathermap.org/data/2.5/forecast?q=" + cityInput.value + "," + countryInput.value + "&units=imperial&appid=61637c2cd1d4b857009ae178fae31f3b");

    oReq.send();
  });


  function reqListener () {

    var weatherData = JSON.parse(this.responseText);

    var weatherDisplay = document.getElementById('weatherDisplay');
    
    var forecastDiv = document.createElement('div');
      forecastDiv.id = 'forecastDiv';
      forecastDiv.innerHTML = 'Forecast for ' + weatherData.city.name;
      weatherDisplay.appendChild(forecastDiv);
    
    var timeUtcDiv = document.createElement('div');
      timeUtcDiv.id = 'timeUtcDiv';
      timeUtcDiv.innerHTML = weatherData.list[0].dt_txt + ' UTC';
      forecastDiv.appendChild(timeUtcDiv);

    var geoCoords = document.createElement('div');
      geoCoords.id = 'geoCoords';
      geoCoords.innerHTML = 'Geographic Coordinates: ' + weatherData.city.coord.lat + ', ' + weatherData.city.coord.lon;
      forecastDiv.appendChild(geoCoords);

    var weatherCondition = document.createElement('div');
      weatherCondition.id = 'weatherCondition';
      weatherCondition.innerHTML = weatherData.list[0].weather[0].description;
      forecastDiv.appendChild(weatherCondition);

    var tempContainer = document.createElement('div');
      tempContainer.id = 'tempContainer';
      weatherDisplay.appendChild(tempContainer);

    var mainTempDiv = document.createElement('div');
      mainTempDiv.id = 'mainTempDiv';
      mainTempDiv.innerHTML = weatherData.list[0].main.temp + '\u00B0F';
      mainTempDiv.style.fontWeight = 'bold';
      tempContainer.appendChild(mainTempDiv);

    var minToMaxTemp = document.createElement('div');
      minToMaxTemp.id = 'minToMaxTemp';
      minToMaxTemp.innerHTML = 'temperatures from ' + weatherData.list[0].main.temp_min + '\u00B0F to ' + weatherData.list[0].main.temp_max + '\u00B0F';
      minToMaxTemp.style.fontStyle = 'italic';
      tempContainer.appendChild(minToMaxTemp);

    var windinessDiv = document.createElement('div');
      windinessDiv.id = 'windinessDiv';
      windinessDiv.innerHTML = 'Wind: ' + weatherData.list[0].wind.speed + ' m/s';
      weatherDisplay.appendChild(windinessDiv);
  
    var cloudinessDiv = document.createElement('div');
      cloudinessDiv.id = 'cloudinessDiv';
      cloudinessDiv.innerHTML = 'Clouds: ' + weatherData.list[0].clouds.all + '%';
      weatherDisplay.appendChild(cloudinessDiv);
  }




