const express = require('express')
const log4js = require('log4js');
const router = new express.Router()

const {search_image} = require('../api/pexelsapi')
const getJsonArray = require('../utils/utils')

log4js.configure({
    appenders: {
      everything: { type: 'file', filename: 'C:/Workspace/Intel/AWS/place-api/logs/pexels.log' }
    },
    categories: {
      default: { appenders: [ 'everything' ], level: 'info'}
    }
  });

const logger = log4js.getLogger();

router.get('/search/image', (req, res) => {
    var queryString = req.query.query;
    queryString = queryString.split(',');
    console.log(req.query.query)
    console.log("length: "+queryString.length);
    console.log("length: "+queryString[1]);
    if (!(req.query.query)) {
        return res.send({
            error: 'You must provide query'
        })
    }
    for (var i = 0; i < queryString.length; i++){
        new search_image(queryString[i], (error, { body } = {}) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            logger.info(body.photos)
            getJsonArray(body.photos,'pexels')
            //res.send(body)
        })
    }
})

module.exports = router