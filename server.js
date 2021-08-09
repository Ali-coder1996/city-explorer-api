const express = require('express');
const weather = require('./data/weather.json');
const app = express();
const cors = require('cors');
require('dotenv').config();
app.use(cors());
const PORT = process.env.PORT;

app.get('/weather', (req, res) => {
  let lat = req.query.lat;
  let lon = req.query.lon;
  let cityName = req.query.cityName;

  let dataHandel=()=>{
    let city = weather.find(item => {
      return (cityName.toLowerCase() === item.city_name.toLowerCase() && Number(lat) === Number(item.lat) && Number(lon) === Number(item.lon)) ;
    });
    return city.data.map(item => {
      console.log(city);
      return new ForeCast(item);
    });
  };

  res.json(dataHandel());
}
);

class ForeCast {
  constructor(weatherData) {
    this.data = weatherData.valid_date;
    this.description = weatherData.weather.description;
  }
}

app.listen(PORT, () => {
  console.log(`this is my port numbers ${PORT}`);
});

