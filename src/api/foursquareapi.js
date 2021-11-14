const request = require('request')

const venue_search = async(query, callback) => {
    const client_id=query.client_id?query.client_id:process.env.FOURSQUARE_CLIENT_ID
    const client_secret=query.client_secret?query.client_secret:process.env.FOURSQUARE_CLIENT_SECRET
    var v=new Date().toISOString().slice(0,10)
    v=v.split('-').join('')
    const url=process.env.FOURSQUARE_API_URL+'?client_id='+client_id+'&client_secret='+client_secret+'&v='+v+'&near='+query.near+'&radius='+query.radius+'&categoryId='+query.categoryId
    console.log(url)
    request({ url, 
        headers: {
            'Content-Type': 'application/json'
         }, json: true }, (error, { body }) => {
            if (error) {
                callback('Unable to connect to foursquare servie', undefined)
            } else {
                callback(undefined, { body }) 
            }
    })
}

module.exports={
    venue_search
}