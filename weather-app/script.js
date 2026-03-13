const inputBox = document.querySelector("input");
const button = document.querySelector("button");
const outputBox = document.querySelector(".output-wrapper");

async function getWeatherDetails(location_name) {
    const url = `https://api.weatherapi.com/v1/current.json?key=0c80b2b56f1943ada19100744230103&q=${location_name}&aqi=no`;
    console.log(`url : ${url}`);

    const api = await fetch(url);

    const api_data = await api.json();
    console.log(`api_data : ${api_data}`);

    return {
        location: api_data.location.name,
        region: api_data.location.region,
        country: api_data.location.country,
        temp_c: api_data.current.temp_c,
        temp_f: api_data.current.temp_f,
        temp_feel_c: api_data.current.feelslike_c,
        temp_feel_f: api_data.current.feelslike_f,
        humidity: api_data.current.humidity,
        weather: api_data.current.condition.text
    }

}

function getWeatherIcon(conditionText) {
    const condition = conditionText.toLowerCase();
    if (condition.includes("thunder") || condition.includes("storm")) {
        return "./assets/thunder.svg";
    } else if (condition.includes("snow") || condition.includes("blizzard") || condition.includes("sleet")) {
        return "./assets/snowy-5.svg";
    } else if (condition.includes("rain") || condition.includes("drizzle") || condition.includes("mist") || condition.includes("fog")) {
        return "./assets/rainy-6.svg";
    } else if (condition.includes("cloud") || condition.includes("overcast")) {
        return "./assets/cloudy-day-1.svg";
    } else {
        return "./assets/day.svg";
    }
}

async function main() {
    
    let location = inputBox.value.trim();

    if (location === "") {
        outputBox.style.border = "2px solid white";
        outputBox.style.borderRadius = "8px";
        outputBox.style.padding = "25px";
        outputBox.style.color = "white";
        outputBox.style.fontize = "16px";
        outputBox.textContent = `Enter a value!!`;
        return;
    }

    else {
        const data = await getWeatherDetails(location);
        const icon = getWeatherIcon(data.weather);

        outputBox.style.border = "2px solid #00b34f";
        outputBox.style.borderRadius = "8px";
        outputBox.style.padding = "25px";
        outputBox.style.gap = "20px";
        outputBox.style.alignItems = "center";

        outputBox.innerHTML = `
            <div class="weather-container">
                <img src="${icon}" alt="${data.weather}" class="weather-icon" />
                <p class="weather-text">${data.weather}</p>
            </div>

            <div class="weather-box">
                <p class="weather-location">
                    location: ${data.location}<br>
                    region: ${data.region}<br>
                    country: ${data.country}
                </p>
                <p>Temperature: ${data.temp_c}°C / ${data.temp_f}°F</p>
                <p>Feels Like: ${data.temp_feel_c}°C / ${data.temp_feel_f}°F</p>
                <p id="humidity">Humidity: ${data.humidity}%</p>
            </div>
        `;
    }

    inputBox.value="";
}


button.addEventListener('click', async () => {
    await main();
});

inputBox.addEventListener('keydown', async (e)=>{
    if(e.key ==="Enter") await main();
})

