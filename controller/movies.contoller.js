'use strict';
const Data = require('../model/movies.model')
const movies_API_key = process.env.movies_API_KEY;
const weather_API_URL = 'https://api.themoviedb.org/3/search/movie'
const axios = require('axios');

const movies=(req, res) => {
    let query=req.query.query
    const url = `${weather_API_URL}?api_key=${movies_API_key}&query=${query}`;
    axios.get(url).then(item => {
      let moviesList = item.data.results
      let araay = []
      moviesList.map((movie) => {
        araay.push(new Data(movie))
      });
      res.json(araay)
    }).catch((error) => { res.send(error.message) })
}

module.exports=movies