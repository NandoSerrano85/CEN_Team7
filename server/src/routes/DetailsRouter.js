var express = require('express');
var exp = express();
var router = express.Router();
var path = require('path')

var Book = require('../models/Product.js');

router.route('/add-item/post').post(function (req, res) {
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
    Book.find({}, function (err, items)  {
        if(err){
            console.log(err);
        }
        else {
            // Save book isbns (for images)...
            console.log("There are " + items.length + " books in the database");
            for (var i = 0; i < items.length; i++) {
              console.log(items[i].isbn);
            }
            res.json(items);
            // Display avaiable books
            // exp.set('view engine', 'ejs');
            // res.render('../views/index.ejs', {books: items});
        }
    });
});

router.route('/edit/:id').get(function (req, res) {
    var id = req.params.id;
    Book.findById(id, function (err, item)  {
        res.json(item);
    });
});

router.route('/update/:id').post(function (req, res) {
    Book.findById(req.params.id, function(err, item) {
        if(!item)
            return next(new Error("Could not load Document"));
        else {
            item.item = req.body.item;

            item.save().then(item => {
                res.json('Update complete')
            })
            .catch(err => {
                res.status(400).send("unable to update the database");
            });
        }
    });
});

router.route("/delete/:id").get(function (req, res){
    Book.findById({_id: req.params.id},
        function(err, item) {
            if(err) res.json(err);
            else res.json('Successfully removed');
        });
});

router.route("/findByISBN/:isbn").get(function (req, res){
    book_isbn = req.params.isbn;
    Book.find({isbn:book_isbn}, function (err, doc)  {
        if(err){
            console.log(err);
        }
        else {
            res.json(doc);
        }
    });

});


router.route("/delete_all").get(function (req, res){
  Book.find(function (err, items)  {
      if(err){
          console.log(err);
      }
      else {
        for (var i = 0; i < items.length; i++) {
          items[i].remove();
        }
      }
      res.redirect('/books');
  });
});

/*
Adds 5 test books to the database.
*/
router.route("/add-books").get(function (req, res){
  var done = 0;
  for (var i = 0; i < 20; i++) {
    var temp = new Book();
    temp.makeRandom((i % 5) + 4);
    temp.save((err,temp) => {
      if(err) return console.error(err);
      console.log("adding book to db");
      done += 1;
    });
  }
  // if(done >= 5){
    res.redirect('/books');
//
});

module.exports = router;
