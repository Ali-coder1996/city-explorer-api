'use strict';
const ForeCast = require('../model/weather.model')
const { default: axios } = require('axios');

const weather =(req, res) => {
    let city = req.query.city;
    let weatherUrl =`https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${process.env.WEATHER_API_KEY}`
    axios.get(weatherUrl).then(item =>{
        console.log(item.data.data)
        let weatherData=item.data.data
        let arrayOfData=[]
         weatherData.map(item =>{
            arrayOfData.push(new ForeCast(item))
        })
        res.status(200).json(arrayOfData)
    }).catch(error =>  {res.status(500).send(error.message)} )

  }

module.exports=weather