const API_KEY = "2710028930a728b0aaddd5b1b2c9debf";

$(document).ready(function () {
    $("#searchButton").click(function (e) {
        e.preventDefault();
        const cityName = $("#cityNameInput").val();
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
        fetch(URL, {
            method: "GET",
        })
            .then((reponse) => reponse.json())
            .then((weatherObj) => {
                const celsiusTemp = (weatherObj.main.temp - 273.15).toFixed(2)
                $("#cityTemp").text(`${celsiusTemp}°C`);
            })
            .catch((error) => console.log(error));
    });
});
