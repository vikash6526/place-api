const mongoose = require('mongoose')

const pexelsSchema = new mongoose.Schema({ },{strict:false})

const pexels = mongoose.model('pexels', pexelsSchema)

module.exports = pexels