var express = require('express');
var exp = express();
var session = require('express-session');
var mongo = require('mongoose');
var bodyParser = require('body-parser');
var port = 4200;
var path = require('path')
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
var detailsRouter = require('./src/routes/DetailsRouter');
var cartRouter = require('./src/routes/CartRouter');

// exp.set('views', path.join(__dirname, 'views'));
// exp.set('view engine', '.hbs');

exp.use(express.static('public'));
exp.use(cors());
exp.use(bodyParser.urlencoded({extended: true}));
exp.use(bodyParser.json());
exp.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
}));
exp.use('/books', detailsRouter);
exp.use('/', cartRouter );
exp.listen(port, function() {
    console.log('Server is runing on port: ', port);
});
