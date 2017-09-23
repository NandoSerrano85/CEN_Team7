//server.js

var express = require('express');
var exp = express();
var mongo = require('mongoose');
var bodyParser = require('body-parser');
var port = 4200;
var cors = require('cors');

mongo.Promise = require('bluebird');
mongo.connect('mongodb://geekbook:G33kB00k!@ds141434.mlab.com:41434/geekbook')
    .then(() => {
        console.log("Start");
    })
    .catch(err => {
        console.error("Starting Error: ", err.stack);
        process.exit(1);
    });
var router = require('./src/routes/DetailsRouter');

exp.use(express.static('public'));
exp.use(cors());
exp.use(bodyParser.urlencoded({extended: true}));
exp.use(bodyParser.json());
exp.use('/items', router);

exp.listen(port, function() {
    console.log('Server is runing on port: ', port);
});
