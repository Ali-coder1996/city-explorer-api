'use strict';
class ForeCast {
    constructor(item) {
      this.valid_date = item.valid_date;
      this.description = item.weather.description;
    }
  }
module.exports=ForeCast  