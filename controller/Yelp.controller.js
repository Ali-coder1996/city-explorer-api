'use strict';
const Yelp = require('../model/ylep.model')
const { default: axios } = require('axios');
let data =require('../data/yelp.json')

const yelp =(req, res) => {
    
        console.log(data)
        let arrayOfData=[]
         data.businesses.map(item =>{
            arrayOfData.push(new Yelp(item))
        })
        
        res.json(arrayOfData)    
  
  }

module.exports=yelp