import React, { useState } from "react";

const openWeatherApi = {
  key: '17eb7b6e20acf32a4d48cbc67b2b4c51',
  base: 'https://api.openweathermap.org/data/2.5/'
};
const worldTideAPIKey = '178b1b28-9a39-43be-b1dd-c3ba04bd4bc5';

const beachCitiesUS = [
  { name: 'Miami', lat: 25.7617, lon: -80.1918 },
  { name: 'Honolulu', lat: 21.3069, lon: -157.8583 },
  { name: 'Malibu', lat: 34.0259, lon: -118.7798 },
  { name: 'Key West', lat: 24.5551, lon: -81.7800 },
  { name: 'Myrtle Beach', lat: 33.6891, lon: -78.8867 },
  { name: 'Virginia Beach', lat: 36.8529, lon: -75.9780 },
  { name: 'Santa Monica', lat: 34.0195, lon: -118.4912 },
  { name: 'Clearwater Beach', lat: 27.9774, lon: -82.8270 },
  { name: 'Daytona Beach', lat: 29.2108, lon: -81.0228 },
  { name: 'Fort Lauderdale', lat: 26.1224, lon: -80.1373 },
  { name: 'Charleston', lat: 32.7765, lon: -79.9311 },
  { name: 'Nags Head', lat: 35.9570, lon: -75.6240 },
  { name: 'Galveston', lat: 29.3013, lon: -94.7977 },
  { name: 'Ocean City', lat: 38.3365, lon: -75.0849 },
  { name: 'Gulf Shores', lat: 30.2460, lon: -87.7008 },
  { name: 'Naples', lat: 26.1420, lon: -81.7948 },
  { name: 'Huntington Beach', lat: 33.6603, lon: -117.9992 },
  { name: 'Destin', lat: 30.3935, lon: -86.4958 }
];

function Section() {
  const [search, setSearch] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [currentTide, setCurrentTide] = useState(null);
  const [isSafe, setIsSafe] = useState(null); // Add state to determine if it's safe

  const searchPressed = () => {
    const selectedCity = beachCitiesUS.find(city => city.name === search);
    if (!selectedCity) {
      alert("Please select a city");
      return;
    }

    const { lat, lon } = selectedCity;

    // Fetch weather data
    fetch(`${openWeatherApi.base}weather?lat=${lat}&lon=${lon}&units=metric&appid=${openWeatherApi.key}`)
      .then(res => res.json())
      .then(result => {
        console.log("Weather Data:", result);
        setWeatherData(result); // Set the weather data

        // After weather data is fetched, fetch tide data
        fetchTideData(lat, lon, result);
      })
      .catch(error => {
        console.error('Error fetching the weather data:', error);
      });
  };

  // Fetch tide data after weather data is fetched
  const fetchTideData = (lat, lon, weatherData) => {
    fetch(`https://www.worldtides.info/api/v2?key=${worldTideAPIKey}&lat=${lat}&lon=${lon}&extremes`)
      .then(res => res.json())
      .then(result => {
        console.log("Tide Data:", result);
        if (result.extremes) {
          const closestTide = getCurrentTide(result.extremes);
          setCurrentTide(closestTide);

          // Evaluate safety based on weather and tide conditions
          evaluateSafety(closestTide, weatherData);
        }
      })
      .catch(error => {
        console.error('Error fetching the tide data:', error);
      });
  };

  // Helper function to find the closest tide to the current time
  const getCurrentTide = (extremes) => {
    const now = new Date().getTime() / 1000; // Get current time in seconds (Unix timestamp)
    return extremes.reduce((prev, curr) => {
      return Math.abs(curr.dt - now) < Math.abs(prev.dt - now) ? curr : prev;
    });
  };

  // Helper function to evaluate beach safety based on weather and tide
  const evaluateSafety = (tide, weather) => {
    if (!weather || !tide) return;

    const windSpeed = weather.wind.speed; // In meters per second
    const temperature = weather.main.temp; // In Celsius
    const tideHeight = tide.height; // In meters

    // Define safety conditions
    const safeWindSpeed = windSpeed <= 10; // Example: <= 10 m/s is safe
    const safeTemperature = temperature >= 15 && temperature <= 35; // Example: 15-35°C is safe
    const safeTide = tideHeight >= -1 && tideHeight <= 1; // Example: tide height between -1m and 1m is safe

    if (safeWindSpeed && safeTemperature && safeTide) {
      setIsSafe(true);
    } else {
      setIsSafe(false);
    }
  };

  return (
    <>
      <section>
        <div className="mainSection">
          <div className="section-title">
            <h1>Get Information on our beaches around the United States</h1>
          </div>
          <div className="container">
            <div className="search-bar-button">
              <select id="cities-option" onChange={(e) => setSearch(e.target.value)} defaultValue="">
                <option value="" disabled>Select a U.S. beach city</option>
                {beachCitiesUS.map((city, index) => (
                  <option key={index} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>

              <div className="searchButton">
                <button onClick={searchPressed}>Search</button>
              </div>
            </div>

            {/* Display Weather and Current Tide Data */}
            {(weatherData && weatherData.main && weatherData.wind) ? (
              <div className="weather-info">
                {/* Weather Data */}
                <h3>Weather in {weatherData.name}, {weatherData.sys.country}</h3>
                <p>Temperature: {weatherData.main.temp}°C</p>
                <p>Wind Speed: {weatherData.wind.speed} m/s</p>

                {/* Current Tide Data */}
                {currentTide && (
                  <div className="tide-info">
                    <h4>Current Tide Information</h4>
                    <p>
                      {new Date(currentTide.dt * 1000).toLocaleString()}: <br />{currentTide.type} tide, Height: {currentTide.height} meters
                    </p>
                  </div>
                )}

                {isSafe !== null && (
                  <div className="safety-info">
                    {isSafe ? (
                      <p style={{ color: "green" }}>Perfect for the beach!</p>
                    ) : (
                      <p style={{ color: "red" }}>May not be best to go today.</p>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="data-display">Data will be displayed here!</div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Section;
