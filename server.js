const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
app.use(cors());
const PORT = process.env.PORT;

const movies = require('./controller/movies.contoller')
const weather =require('./controller/wearher.controller');
const Yelp = require('./controller/Yelp.controller');
// first api weather data

app.get('/weather', weather );

app.get('/movies',movies );

app.get('/yelp',Yelp );

app.listen(PORT, () => {
  console.log(`this is my port numbers ${PORT}`);
});
