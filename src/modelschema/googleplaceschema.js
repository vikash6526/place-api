const mongoose = require('mongoose')

const googleplaceSchema = new mongoose.Schema({ },{strict:false})

const googleplace = mongoose.model('googleplace', googleplaceSchema)

module.exports = googleplace