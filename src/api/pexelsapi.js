const request = require('request')

const search_image = function(query, callback) {
    const url = 'https://api.pexels.com/v1/search?query='+query
    console.log(url)
    request({ url, 
        headers: {
            'Content-Type': 'application/json',
            'Authorization':'563492ad6f91700001000001ca65c79cefbd47abb61574c37b658f12'
         } ,
         json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect pexels servie', undefined)
        } else if (body === 0) {
            callback('No data found!', undefined)
        } else {
            callback(undefined, { body })
        }
    })
}

module.exports = {
    search_image
}