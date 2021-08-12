'use strict';
const ForeCast = require('../model/weather.model')
const { default: axios } = require('axios');
const Cashe = require('../helper/ForeCastCash')
const foreCastCashe = new Cashe([]); 

const weather =(req, res) => {
  if (foreCastCashe.forecastData.length){
    res.json({message:'coming from cashe:',data:foreCastCashe.forecastData})
  }else {
    let city = req.query.city;
    let weatherUrl =`https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${process.env.WEATHER_API_KEY}`
    axios.get(weatherUrl).then(item =>{
        console.log(item.data.data)
        let weatherData=item.data.data
        let arrayOfData=[]
         weatherData.map(item =>{
            arrayOfData.push(new ForeCast(item))
        })
        foreCastCashe.forecastData=arrayOfData
        res.json({message:'coming from api:',data:arrayOfData})
    }).catch(error =>  {res.status(500).send(error.message)} )
    
  }
  }

module.exports=weather