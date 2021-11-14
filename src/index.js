const express = require('express')
require('./db/mongoose')

//const foursquare = require('./router/foursquare')
//const googleplace=require('./router/googleplace')s
//const yelp = require('./router/yelp')
const pexels = require('./router/pexels')

const app = express()
const port = process.env.PORT

//app.use(express.json())
//app.use(foursquare)
//app.use(googleplace)
//app.use(yelp)
app.use(pexels)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})const express = require('express')
require('./db/mongoose')

const foursquare = require('./router/foursquare')
const googleplace=require('./router/googleplace')
const yelp = require('./router/yelp')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(foursquare)
app.use(googleplace)
app.use(yelp)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})