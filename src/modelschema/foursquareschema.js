const mongoose = require('mongoose')

const foursquareSchema = new mongoose.Schema({ },{strict:false})

const foursquare = mongoose.model('foursquare', foursquareSchema)

module.exports = foursquare