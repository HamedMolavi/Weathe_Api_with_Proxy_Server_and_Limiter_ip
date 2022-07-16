
$(document).ready(function () {
    $("#searchButton").click(function (e) {
        e.preventDefault();
        const cityName = $("#cityNameInput").val();
        const URL = `http://localhost:4000/openWeatherMapAPiProxy`;
        fetch(URL, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ cityName }),
        })
            .then((response) => {
                if (response.status === 429) {
                    return { message: "Too Many Requests!" }
                } else {
                    return response.json()
                }
            })
            .then((obj) => {
                if (obj.message) {
                    $("#cityTemp").text(obj.message);
                } else {
                    const celsiusTemp = (obj.main.temp - 273.15).toFixed(2);
                    $("#cityTemp").text(`${celsiusTemp}°C`);
                }
            })
            .catch((error) => {
                console.log(error);
                $("#cityTemp").text(`An Error Occured`)
            });
    });
});
