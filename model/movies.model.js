'use strict';

class Data {
    constructor(movie) {
      this.released_on = movie.release_date,
        this.title = movie.title,
        this.overview = movie.overview,
        this.average_votes = movie.vote_average,
        this.total_votes = movie.vote_count,
        this.image_url = movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'https://image.tmdb.org/t/p/w200/csE4ldFMH415Irm22kJCXd04wNL.jpg',
        this.popularity = movie.popularity;
    }
  }

module.exports=Data