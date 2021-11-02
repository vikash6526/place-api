const request = require('request')

var key=''
var url=''
const place_search_location = async(query, callback) => {
    key=query.key?query.key:process.env.GOOGLE_KEY
    url = process.env.GOOGLE_API_NEAR_BY+'?key='+key
    url= url+'&location='+query.location+'&radius='+query.radius+'&type='+query.type+'&keyword='+query.keyword
    console.log(url)
    request({ url, 
        headers: {
            'Content-Type': 'application/json'
         }, json: true }, (error, { body }) => {
            if (error) {
                callback('Unable to connect to google servie', undefined)
            } else {
                callback(undefined, { body })
            }
    })
}

const place_search_id = (query, callback) => {
    key=query.key?query.key:process.env.GOOGLE_KEY
    url = process.env.GOOGLE_API_PLACE_DETAILS+'?key='+key
    url = url+'&place_id='+query.place_id+'&fields='+query.fields
    console.log(url)
    request({ url, 
        headers: {
            'Content-Type': 'application/json'
         } ,
         json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to google servie', undefined)
        } else {
            callback(undefined, { body })
        }
    })
}

const place_photo_search = (query, callback) => {
    key=query.key?query.key:process.env.GOOGLE_KEY
    url = process.env.GOOGLE_API_PHOTO+'?key='+key
    url = url+'&maxwidth='+query.maxwidth+'&photoreference='+query.photoreference
    console.log(url)
    request({ url, 
        headers: {
            'Content-Type': 'application/json',
         } ,
         json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to google servie', undefined)
        } else {
            callback(undefined, { body })
        }
    })
}

const place_text_search = (query, callback) => {
    key=query.key?query.key:process.env.GOOGLE_KEY
    url = process.env.GOOGLE_API_TEXT_SEARCH+'?key='+key
    url = url+'&query='+query.query
    console.log(url)
    request({ url, 
        headers: {
            'Content-Type': 'application/json',
         } ,
        json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to google servie', undefined)
        } else {
            callback(undefined, { body })
        }
    })
}


module.exports = {
    place_search_location,
    place_search_id,
    place_photo_search,
    place_text_search
}