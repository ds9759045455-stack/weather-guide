const apiKey = "cabb4ab3e9cb03999b78a31aa2c092fa"; // 👈 Replace this

function showLoader(show) {
    document.getElementById("loader").classList.toggle("hidden", !show);
}

async function getWeather() {
    let city = document.getElementById("city").value;

    if (!city) {
        alert("Please enter city name");
        return;
    }

    showLoader(true);

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    let response = await fetch(url);
    let data = await response.json();

    showLoader(false);
    displayWeather(data);
}

function getLocationWeather() {
    navigator.geolocation.getCurrentPosition(async position => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        showLoader(true);

        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        let response = await fetch(url);
        let data = await response.json();

        showLoader(false);
        displayWeather(data);
    });
}

function displayWeather(data) {
    if (data.cod !== 200) {
        document.getElementById("result").innerHTML = "❌ City not found!";
        return;
    }

    let weather = data.weather[0].main;
    changeBackground(weather);

    document.getElementById("result").innerHTML = `
        <h2>${data.name}</h2>
        <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png">
        <p>🌡 Temperature: ${data.main.temp} °C</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>🌬 Wind Speed: ${data.wind.speed} m/s</p>
        <p>☁ Condition: ${weather}</p>
    `;
}

function changeBackground(weather) {
    if (weather === "Clear") {
        document.body.style.background = "#fbbf24";
    } else if (weather === "Rain") {
        document.body.style.background = "#1e3a8a";
    } else if (weather === "Clouds") {
        document.body.style.background = "#6b7280";
    } else {
        document.body.style.background = "#0f172a";
    }
}