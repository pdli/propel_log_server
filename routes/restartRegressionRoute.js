/**
 * Created by pengl on 6/26/2017.
 */

const controller = require('../controllers/restartRegressionController');
const express = require('express');
const path = require('path');
const serveIndex = require('serve-index');
const serveStatic = require('serve-static');
const fs = require('fs');
var router = express.Router();

//distill image folders from ./images.
var imagesList = fs.readdirSync( path.join(__dirname, '../images') );
for( var i =0; i< imagesList.length; i++) {

    router.use('/images/'+ imagesList[i], serveStatic(path.join(__dirname, '../images/'+ imagesList[i])));
    router.use('/images/'+ imagesList[i], serveIndex(path.join(__dirname, '../images/'+ imagesList[i])));

    router.get('/'+imagesList[i], function (req, res) {

        req.images = '/images' + req.url;
        controller.display_logs(req, res);
    });
}

// Home page
router.get('/', function (req, res) {

    res.send('Welcome to Propel Logger Server.' );
});

// Display logs
router.get('/logs', controller.display_logs);

module.exports = router