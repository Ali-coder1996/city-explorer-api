const express = require('express');
const weather = require('./data/weather.json');
const app = express();
const cors = require('cors');
require('dotenv').config();
app.use(cors());
const axios = require('axios');

const PORT = process.env.PORT;
const movies_API_key = process.env.movies_API_KEY;
const weather_API_URL = 'http://api.themoviedb.org/3/movie/top_rated'



// first api weather data
app.get('/weather', (req, res) => {
  let lat = Number(req.query.lat);
  let lon = Number(req.query.lon);
  // let cityName = req.query.cityName;
  let city = {};
  city = weather.find(item => {
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
});



app.get('/movies', async (req, res) => {
  let city_name = req.query.city_name
  const url = `${weather_API_URL}?api_key=${movies_API_key}&city_name=${city_name}`;

  await axios.get(url).then(res => {
      console.log(res.data.results)
      let araay =[]
        let moviesList =res.data.results.map((movie) => {
         araay.push(new Data(movie))
      });
      console.log(araay)
      res.status(200).send(araay)
    }).catch((error) => { res.status(500).send(error) })

    
});


class ForeCast {
  constructor(item) {
    this.valid_date = item.valid_date;
    this.description = item.weather.description;
  }
}

class Data {
  constructor(movie) {
    this.released_on = movie.release_date,
      this.title = movie.title,
      this.overview = movie.overview,
      this.average_votes = movie.vote_average,
      this.total_votes = movie.vote_count,
      this.image_url = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
      this.popularity = movie.popularity;
  }
}

app.listen(PORT, () => {
  console.log(`this is my port numbers ${PORT}`);
});
