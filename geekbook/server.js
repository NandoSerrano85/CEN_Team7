var express = require('express');
var exp = express();
var session = require('express-session');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var port = 4200;
var path = require('path')
var cors = require('cors');
var MongoStore = require('connect-mongo')(session);

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://geekbook:G33kB00k!@ds141434.mlab.com:41434/geekbook')
    .then(() => {
        console.log("Start");
    })
    .catch(err => {
        console.error("Starting Error: ", err.stack);
        process.exit(1);
    });
var detailsRouter = require('./src/routes/DetailsRouter');
var cartRouter = require('./src/routes/CartRouter');

exp.use(express.static('public'));
exp.use(cors());
exp.use(bodyParser.urlencoded({extended: true}));
exp.use(bodyParser.json());
exp.use(session({
    secret: 'mysupersecret',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));
exp.use('/books', detailsRouter);
exp.use('/cart', cartRouter);
exp.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});

exp.listen(port, function() {
    console.log('Server is runing on port: ', port);
});
