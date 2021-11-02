const express = require('express')
const log4js = require('log4js');
const router = new express.Router()

const {business_search, business_search_id, business_search_reviews, business_search_phone, transaction_search, getBusiness} = require('../api/yelpapi')
const getJsonArray = require('../utils/utils')

log4js.configure({
    appenders: {
      everything: { type: 'file', filename: 'C:/Workspace/Intel/AWS/place-api/logs/yelp.log' }
    },
    categories: {
      default: { appenders: [ 'everything' ], level: 'info'}
    }
  });

const logger = log4js.getLogger();

router.get('/business', async (req, res) => {
    console.log(req.query)
    if (!(req.query.location)) {
        return res.send({
            error: 'You must provide location'
        })
    }
    const limit=parseInt(req.query.limit)
    var offset=parseInt(req.query.offset)
    //for(var i=0;i<2;i++){
        getBusiness(req.query, limit, offset, (error, { body } = {}) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            getJsonArray(body.businesses,'yelp')
            logger.info(body.businesses);
            res.send(body.businesses)
        })
        //offset=offset+limit
    //}
})

router.get('/business/:id', (req, res) => {
    console.log("hello123")
    if (!(req.params.id)) {
        return res.send({
            error: 'You must provide business ID'
        })
    }
    business_search_id(req.params.id, (error, { body } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        logger.info(body)
        res.send(body)
    })
})

router.get('/business/:id/reviews', (req, res) => {
    console.log(req.params.id)
    if (!(req.params.id)) {
        return res.send({
            error: 'You must provide business ID'
        })
    }
    business_search_reviews(req.params.id, (error, { body } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        logger.info(body)
        getJsonArray(body.reviews,'yelp')
        res.send(body)
    })
})

router.get('/business/search/phone', (req, res) => {
    console.log(req.query.phone)
    if (!(req.query.phone)) {
        return res.send({
            error: 'You must provide phone no'
        })
    }
    business_search_phone(req.query.phone, (error, { body } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        logger.info(body)
        getJsonArray(body.businesses,'yelp')
        res.send(body)
    })
})

router.get('/transaction/search/:transaction_type', (req, res) => {
    console.log(req.params.transaction_type)
    console.log(req.query.location)
    if (!(req.query.location || req.params.transaction_type)) {
        return res.send({
            error: 'You must provide required attributes'
        })
    }
    transaction_search(req.params.transaction_type, req.query.location, (error, { body } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        logger.info(body)
        getJsonArray(body.businesses,'yelp')
        res.send(body)
    })
})


module.exports = router