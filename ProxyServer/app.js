const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
require("dotenv").config();
const { limitter } = require('./auth/index');
const configure = require('./config/config');

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post('/openWeatherMapAPiProxy', limitter(), (req, res) => {
    if (!!req.body.cityName) {
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${req.body.cityName}&limit=1&appid=${configure.wAPI_KEY}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const URL = `http://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&appid=${configure.wAPI_KEY}`;
                return fetch(URL)
                    .then((reponse) => reponse.json())
                    .then((weatherObj) => res.json(weatherObj))
                    .catch((error) => {
                        res.status(500).json({
                            message: "Error in fetching data",
                        })
                    });
                ;
            });
    } else {
        console.log('No acceptable request body.');
        res.json({ status: 406 });
    };
});

app.listen(PORT, () => {
    console.log(`Proxy Server is running on port ${PORT}`);
});
