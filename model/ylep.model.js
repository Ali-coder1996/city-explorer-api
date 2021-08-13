'use strict';

class Yelp {
    constructor(item) {
        this.name = item.name,
        this.price = item.price,
        this.rating = item.rating,
        this.url = item.url,
        this.image_url =item.image_url;
    }
  }

module.exports=Yelp