import React, { useState } from "react";
import rain from './assets/Rain.png'

const api = {
  key:"config.MY_KEY",
  base:"https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if(evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);
      });
    }
  }

  const dateBuilder=(d) => {
    let months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    let days = ["Sun","Mon","Tue","Wed","Thu","Sat"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`; 
  }

  const source = () =>{
    switch  (weather.weather[0].main) {
      case 'Rain' :
        return rain;
      case 'Clouds' :
        return rain;
      case 'Haze' :
        return rain;
      default:
        return rain;
    }
  }

  return (
    <div className="App">
      <main>
        <div className="search-box">
          
            <input 
            type="text"
            className="search-bar"
            placeholder="Search City..."
            onChange = {e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
            />
        </div>
        {(typeof weather.main!="undefined") ? (
        <div>
          <div className="location-box">
        <div className="location">{weather.name},{weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="weather-box">
          <div className="weather-image"><img src={rain}/></div>
          <div className="weather-details">
            <div className="temp">{Math.round(weather.main.temp)}°c</div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
      </div>
        ) :('')}
      </main>
    </div>
  );
}

export default App;
