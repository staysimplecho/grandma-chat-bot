"use strict";

const express = require('express');
const axios = require('axios');
const OutbreakAPI = require('../services/outbreak-api');

async function myfunc(start_date, end_date, keyterms, undefined) {
    const outbreakAPI = new OutbreakAPI(
        start_date,
        end_date,
        keyterms,
        undefined
    );
    const articles = await outbreakAPI.getArticles();
    return articles;
}

const router = express.Router();
router.get('/diseases', (request, response) => {
    const start_date = request.query.start_date;
    const end_date = request.query.end_date;
    const keyterms = request.query.keyterms;
    const outbreakAPI = new OutbreakAPI(
        start_date,
        end_date,
        keyterms,
        undefined
    );
    const articles = outbreakAPI.getArticles();
    const result = myfunc(start_date, end_date, keyterms, undefined);
    console.log(result);
    const userAttributes = {
        set_attributes: {
            articles: result,
        }
    };
    result.then(response.send.bind(res))
    response.json(userAttributes.set_attributes);
});

module.exports = router;
