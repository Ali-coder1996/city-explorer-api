'use strict';
const Data = require('../model/movies.model')
const movies_API_key = process.env.movies_API_KEY;
const weather_API_URL = 'https://api.themoviedb.org/3/movie/top_rated'
const axios = require('axios');

const movies=(req, res) => {
    // let city_name=req.query.city_name
    const url = `${weather_API_URL}?api_key=${movies_API_key}`;
    axios.get(url).then(item => {
      console.log(item.data)
      let moviesList = item.data.results
      let araay = []
      moviesList.map((movie) => {
        araay.push(new Data(movie))
      });
      console.log(araay)
      res.json(araay)
    }).catch((error) => { res.send(error.message) })
}

module.exports=movies