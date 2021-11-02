const request = require('request')
const fetch = require('node-fetch')

var token=''
const business_search = async (query, limit, offset) => {
    const url = process.env.YELP_API_BUSINESS_SEARCH+'?term='+query.term+'&location='+query.location+'&limit='+limit+'&offset='+offset+'&radius='+query.radius
    console.log(url)
    var headers={}
    headers= {
        'Content-Type': 'application/json',
        'Authorization':process.env.YELP_BEARER_TOKEN
    }
    await fetch(url, { method: 'GET', 
    headers: headers,
    json : true
    }).then((res) => {
        console.log(res[1].body)
        return res
    })
    .then((json) => {
        //console.log(json)
    })
    
}

async function getBusiness(query, limit, offset, callback){
    const url = process.env.YELP_API_BUSINESS_SEARCH+'?term='+query.term+'&location='+query.location+'&limit='+limit+'&offset='+offset+'&radius='+query.radius
    console.log(url)
    request({ url, 
        headers: {
            'Content-Type': 'application/json',
            'Authorization':process.env.YELP_BEARER_TOKEN
        },
        json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to yelp servie', undefined)
        } else if (body === 0) {
            callback('No data found', undefined)
        } else {
            callback(undefined, { body })
        }
    })
}

const business_search_id = (id, callback) => {
    const url = process.env.YELP_API_BUSINESS+id
    console.log(url)
    request({ url, 
        headers: {
            'Content-Type': 'application/json',
            'Authorization':process.env.YELP_BEARER_TOKEN
         } ,
         json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect yelp servie', undefined)
        } else if (body === 0) {
            callback('No data found!', undefined)
        } else {
            callback(undefined, { body })
        }
    })
}

const business_search_reviews = (id, callback) => {
    const url = process.env.YELP_API_BUSINESS+id+'/reviews'
    console.log(url)
    request({ url, 
        headers: {
            'Content-Type': 'application/json',
            'Authorization':process.env.YELP_BEARER_TOKEN
         } ,
         json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect yelp servie', undefined)
        } else if (body === 0) {
            callback('No data found!', undefined)
        } else {
            callback(undefined, { body })
        }
    })
}

const business_search_phone = (phone, callback) => {
    const url = process.env.YELP_API_BUSINESS_SEARCH_PHONE+'?phone='+phone
    console.log(url)
    request({ url, 
        headers: {
            'Content-Type': 'application/json',
            'Authorization':process.env.YELP_BEARER_TOKEN
         } ,
         json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect yelp servie', undefined)
        } else if (body === 0) {
            callback('No data found!', undefined)
        } else {
            callback(undefined, { body })
        }
    })
}

const transaction_search = (type, location, callback) => {
    const url = process.env.YELP_API_TRANSACTION_SEARCH+type+'/search?location='+location
    console.log(url)
    request({ url, 
        headers: {
            'Content-Type': 'application/json',
            'Authorization':process.env.YELP_BEARER_TOKEN
         } ,
         json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect yelp servie', undefined)
        } else if (body === 0) {
            callback('No data found!', undefined)
        } else {
            callback(undefined, { body })
        }
    })
}



module.exports = {
    business_search,
    business_search_id,
    business_search_reviews,
    business_search_phone,
    transaction_search,
    getBusiness
}