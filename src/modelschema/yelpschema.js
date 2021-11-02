const mongoose = require('mongoose')

const yelpSchema = new mongoose.Schema({ },{strict:false})

const yelp = mongoose.model('yelp', yelpSchema)

module.exports = yelp