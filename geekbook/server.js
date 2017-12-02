var express = require('express');
var session = require('express-session');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var port = 4200;
var path = require('path')
var cors = require('cors');
var flash = require('connect-flash');
var passport = require('passport');
var validator = require('express-validator');
var MongoStore = require('connect-mongo')(session);
var exp = express();

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
var userRouter = require('./src/routes/UserRouter');

exp.use(flash());
exp.use(validator());
exp.use(express.static('public'));
exp.use(cors());
exp.use(bodyParser.urlencoded({extended: true}));
exp.use(bodyParser.json());
exp.use(session({
    secret: 'mysupersecret',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: {maxAge: 10000000 }
}));
exp.use('/books', detailsRouter);
exp.use('/cart', cartRouter);
exp.use('/user', userRouter);
exp.use(passport.initialize());
exp.use(passport.session());
exp.use(function(req, res, next) {
    res.locals.session = req.session;
    return next();
});

exp.listen(port, function() {
    console.log('Server is runing on port: ', port);
});

module.exports = exp;
