const express = require('express');
const weather = require('./data/weather.json');
const app = express();
const cors = require('cors');
require('dotenv').config();
app.use(cors());
const PORT = process.env.PORT;
// first api weather data
app.get('/weather', (req, res) => {
  let lat = req.query.lat;
  let lon = req.query.lon;
  let cityName = req.query.cityName;
  let city ={};
  city = weather.find(item => {
    return (cityName.toLowerCase() === item.city_name.toLowerCase() && Number(lat) === item.lat && Number(lon) === item.lon);
  });
  if (city) {
    let cityData=[];
    console.log(city);
    city.data.map(item => {
      cityData.push(new ForeCast(item));
    });
    res.json(cityData);
  }else {
    res.status(500).send('Could not find the city you searched for');
  }
});

class ForeCast {
  constructor(item) {
    this.valid_date = item.valid_date;
    this.description = item.weather.description;
  }
}

app.listen(PORT, () => {
  console.log(`this is my port numbers ${PORT}`);
});
