const express = require('express')
const router = new express.Router()
const log4js = require('log4js');

const { venue_search } = require('../api/foursquareapi')
const getJsonArray = require('../utils/utils')

log4js.configure({
    appenders: {
      everything: { type: 'file', filename: 'C:/Workspace/Intel/AWS/place-api/logs/foursquare.log' }
    },
    categories: {
      default: { appenders: [ 'everything' ], level: 'info'}
    }
});

const logger = log4js.getLogger();


router.get('/venues/search', (req, res) => {
    console.log(req.query)
    if (!(req.query)) {
        return res.send({
            error: 'You must provide required query parameters'
        })
    }
    venue_search(req.query, (error, { body } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        getJsonArray(body.response.venues,'foursquare')
        logger.info(body.response.venues);
        res.send(body.response.venues)
    })
})

module.exports = router