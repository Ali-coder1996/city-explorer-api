'use strict';
const ForeCast = require('../model/weather.model')
const weathers = require('../data/weather.json');

const weather =(req, res) => {
    let lat = Number(req.query.lat);
    let lon = Number(req.query.lon);
    // let cityName = req.query.cityName;
    let city = {};
    city = weathers.find(item => {
      return (lat === Number(item.lat) || lon === Number(item.lon));
    });
    if (city) {
      let cityData = [];
      console.log(city);
      city.data.map(item => {
        cityData.push(new ForeCast(item));
      });
      res.json(cityData);
    } else {
      res.status(500).send('Could not find the city you searched for');
    }
  }

module.exports=weather