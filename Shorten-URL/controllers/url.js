const shortid = require('shortid');
const URL = require('../models/url');
const { handleDeleteUserByID } = require('../../Project-01/controllers/user');

async function handleGenerateNewShortURL(req, res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error: 'URL is required '});
    const shortID = shortid();

    await URL.create({
        shortId: shortID,
        redirectURL:  body.url,
        visitHistory: [],
    });

    return res.json({id: shortID});
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
}