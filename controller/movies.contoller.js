'use strict';
const Data = require('../model/movies.model')
const movies_API_key = process.env.movies_API_KEY;
const weather_API_URL = 'https://api.themoviedb.org/3/search/movie'
const axios = require('axios');
const Cashe = require('../helper/ForeCastCash')
const foreCastCashe = new Cashe([]); 

const movies=(req, res) => {
    if (foreCastCashe.forecastData.length){
      res.json({message:'coming from cashe:',data:foreCastCashe.forecastData})
    }else{
      let query=req.query.query
      const url = `${weather_API_URL}?api_key=${movies_API_key}&query=${query}`;
      axios.get(url).then(item => {
        let moviesList = item.data.results
        let araay = []
        moviesList.map((movie) => {
          araay.push(new Data(movie))
        });
        foreCastCashe.forecastData=araay
        res.json({message:'coming from api:',data:araay})
      }).catch((error) => { res.send(error.message) })
    }
    
}

module.exports=movies