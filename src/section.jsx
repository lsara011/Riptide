import React from "react";
import { useState } from "react";

const api = {
    key: '17eb7b6e20acf32a4d48cbc67b2b4c51',
    base: 'https://api.openweathermap.org/data/2.5/'
  };
  
  const beachCitiesUS = [
    { name: 'Miami', value: 'Miami,US' },
    { name: 'Honolulu', value: 'Honolulu,US' },  // Use Honolulu for Waikiki
    { name: 'San Diego', value: 'San Diego,US' },
    { name: 'Malibu', value: 'Malibu,US' },
    { name: 'Key West', value: 'Key West,US' },
    { name: 'Myrtle Beach', value: 'Myrtle Beach,US' },
    { name: 'Virginia Beach', value: 'Virginia Beach,US' },
    { name: 'Santa Monica', value: 'Santa Monica,US' },
    { name: 'Clearwater Beach', value: 'Clearwater Beach,US' },
    { name: 'Daytona Beach', value: 'Daytona Beach,US' },
    { name: 'Fort Lauderdale', value: 'Fort Lauderdale,US' },
    { name: 'Charleston', value: 'Charleston,US' },
    { name: 'Nags Head', value: 'Nags Head,US' },  // Use Nags Head for Outer Banks
    { name: 'Galveston', value: 'Galveston,US' },
    { name: 'Ocean City', value: 'Ocean City,US' },
    { name: 'Gulf Shores', value: 'Gulf Shores,US' },
    { name: 'Naples', value: 'Naples,US' },
    { name: 'Huntington Beach', value: 'Huntington Beach,US' },
    { name: 'Destin', value: 'Destin,US' }
  ];

  
  
  function Section() {
    const [search, setSearch] = useState("");
    const [weatherData, setWeatherData] = useState(null);
  
    const searchPressed = () => {
      if (!search) {
        alert("Please select a city");
        return;
      }
  
      fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          console.log(JSON.stringify(result));
          setWeatherData(result);
        })
        .catch(error => {
          console.error('Error fetching the weather data:', error);
        });
    };
  
    return (
      <>
        <section>
          <div className="mainSection">
            <div className="container">
              {/* Beach City Selection */}
              <div className="search-bar-button">
                <select id="cities-option" onChange={(e) => setSearch(e.target.value)} defaultValue="">
                  <option value="" disabled >Select a U.S. beach city</option>
                  {beachCitiesUS.map((city, index) => (
                    <option key={index} value={city.value}>
                      {city.name}
                    </option>
                  ))}
                </select>
  
                <div className="searchButton">
                  <button onClick={searchPressed}>Search</button>
                </div>
              </div>
  
              {/* Display Weather Data */}
              {weatherData && weatherData.main && weatherData.weather && weatherData.wind && (
                <div className="weather-info">
                  <h3>Weather in {weatherData.name}, {weatherData.sys.country}</h3>
                  <p>Temperature: {weatherData.main.temp}°C</p>
                  <p>Weather: {weatherData.weather[0].description}</p>
                  <p>Humidity: {weatherData.main.humidity}%</p>
                  <p>Cloudiness: {weatherData.clouds.all}%</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </>
    );
  }
  
  export default Section;