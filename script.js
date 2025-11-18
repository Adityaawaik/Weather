const searchCountry = document.querySelector(".search-country-here");

const searchBtn = document.querySelector(".search");

const countryInformation = document.querySelector(
  ".country-weather-information"
);

const warningMsg = document.querySelector(".warning");

searchCountry.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    fetchingUrl();
  }
});

searchBtn.addEventListener("click", () => {
  fetchingUrl();
});

const fetchingUrl = async () => {
  const URL = ` https://api.weatherapi.com/v1/current.json?key=8d2b8aa769634f51862145041252910&q=${searchCountry.value}&aqi=no`;

  const date = new Date();

  try {
    const fetchUrl = await fetch(URL);
    const response = await fetchUrl.json();
    console.log(response.current.wind_dir);
    countryInformation.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="country-weather-information">
          <h2 class="country-name">${response.location.name}</h2>
          <div class="date-para">
            <p class="today-date">${date.toDateString()}</p>
          </div>

          <p class="weather-felling">${response.current.condition.text}</p>

          <h1 class="country-temperature">${response.current.temp_c}℃</h1>

          <div class="weather-information">
            <p class="wind-direction">Wind Direction : ${
              response.current.wind_dir
            }</p>
            <p class="precipitation">Precipitation : ${
              response.current.precip_mm
            }</p>
            <p class="pressuure">Pressure : ${
              response.current.pressure_mb
            }(millibar)</p>
            <p class="temperature">Temperature in Farenhiet : ${
              response.current.temp_f
            }F</p>
            <p class="latitude">Latitude : ${response.location.lat}</p>
            <p class="longitude">Longitude : ${response.location.lon}</p>
          </div>

          <div class="weather-summary-container">
            <div class="weather-summary">
              <div class="wind-content">
                <i class="fa-solid fa-wind"></i>
                <br />
                <p class="wind-speed">${response.current.wind_kph}km/h</p>
                <p class="wind">Wind</p>
              </div>

              <div class="humidity-content">
                <i class="fa-solid fa-droplet"></i>
                <br />
                <p class="humidity-percent">${response.current.humidity}%</p>
                <p class="humidity">Humidity</p>
              </div>

              <div class="visibility-content">
                <i class="fa-solid fa-eye"></i>
                <br />
                <p class="visibility-distance">${response.current.vis_km}km</p>
                <p class="visibility">Visibility</p>
              </div>
            </div>
          </div>
        </div>
    `;
    warningMsg.innerHTML = "";
    searchCountry.value = "";
    countryInformation.append(div);
  } catch (error) {
    warningMsg.innerHTML =
      "There is some error or You have entered wrong country name";
    countryInformation.innerHTML = "  ";
  }
};
