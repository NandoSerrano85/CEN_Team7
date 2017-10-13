//server.js

var express = require('express');
var exp = express();
var mongo = require('mongoose');
var bodyParser = require('body-parser');
var port = 4200;
var path = require('path')
var cors = require('cors');
var Book = require('./src/models/Product.js')

mongo.Promise = require('bluebird');
mongo.connect('mongodb://geekbook:G33kB00k!@ds141434.mlab.com:41434/geekbook')
    .then(() => {
        console.log("Start");
    })
    .catch(err => {
        console.error("Starting Error: ", err.stack);
        process.exit(1);
    });



var detailsRouter = require('./src/routes/DetailsRouter');
//var cart = require('./src/routes/CartRoutes');

exp.use(express.static('public'));
exp.use(cors());
exp.use(bodyParser.urlencoded({extended: true}));
exp.use(bodyParser.json());
exp.use('/books', detailsRouter);

exp.listen(port, function() {
    console.log('Server is runing on port: ', port);
});
