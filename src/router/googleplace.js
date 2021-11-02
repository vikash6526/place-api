const express = require('express')
const router = new express.Router()
const log4js = require('log4js');

const {place_search_location, place_search_id, place_photo_search, place_text_search} = require('../api/googleplaceapi')
const getJsonArray = require('../utils/utils')

log4js.configure({
    appenders: {
      everything: { type: 'file', filename: 'C:/Workspace/Intel/AWS/place-api/logs/google.log' }
    },
    categories: {
      default: { appenders: [ 'everything' ], level: 'info'}
    }
  });

const logger = log4js.getLogger();

router.get('/nearbysearch', (req, res) => {
    console.log(req.query)
    if (!(req.query)) {
        return res.send({
            error: 'You must provide required query parameter'
        })
    }
    place_search_location(req.query, (error, { body } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        getJsonArray(body.results,'googleplace')
        logger.info(body.results);
        res.send(body)
    })
})

router.get('/placedetails', (req, res) => {
    if (!(req.query)) {
        return res.send({
            error: 'You must provide placeID'
        })
    }
    place_search_id(req.query, (error, { body } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        logger.info(body);
        res.send(body)
    })
})


router.get('/placephoto', (req, res) => {
    console.log(req.query)
    if (!(req.query)) {
        return res.send({
            error: 'You must provide photo reference'
        })
    }
    place_photo_search(req.params.id, (error, { body } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        //console.log(body)
        getJsonArray(body.reviews,'googleplace')
        res.send(body)
    })
})

router.get('/textsearch', (req, res) => {
    console.log(req.query)
    if (!(req.query)) {
        return res.send({
            error: 'You must provide required query attributes'
        })
    }
    place_text_search(req.query, (error, { body } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        getJsonArray(body.results,'googleplace')
        logger.info(body);
        res.send(body)
    })
})

module.exports = router