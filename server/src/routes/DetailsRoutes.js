var express = require('express');
var exp = express();
var router = express.Router();

var Book = ('../models/Book');

router.route('/add/post').post(function (req, res) {
    var item = new Book(req.body);
        item.save()
        .then(item => {
            res.json('Item added');
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

router.route('/').get(function (req, res) {
    Book.find(function (err, items)  {
        if(err){
            console.log(err);
        }
        else {
            res.json(items);
        }
    });
});

router.route('/edit/:id').get(function (req, res) {
    var id = req.param.id;
    Book.findById(id, function (err, item)  {
        res.json(item);
    });
});
