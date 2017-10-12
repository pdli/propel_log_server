/**
 * Created by pengl on 6/23/2017.
 * Description:
 *       1) launch one http server
 *       2) list images as logs
 * Parameters :
 * Return     : Null
 */

const propelLogRoute = require('./routes/restartRegressionRoute');
const path = require('path');
const ejs = require('ejs');
const express = require('express');
const serveIndex = require('serve-index');
const serveStatic = require('serve-static');
const app = express();


app.set('views', __dirname + '/views'); // general config
app.set('view engine', 'ejs');

app.use('/dist', express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/popper.js', express.static(__dirname + '/node_modules/popper.js/dist/umd/'));

app.use('/propel', propelLogRoute);

app.get('/', function (req, res) {

    res.writeHead(200, {'Content-Type': "text/html"});
    res.write("Hello, http server is up now...");
    res.end();
})

var server = app.listen(8081, function () {

    var host = server.address().address;
    var port = server.address().port;
    console.log("app server listening at%s %s", host, port)
})

