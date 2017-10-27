var express = require('express');
var app = express();
var userRouter = express.Router();

var User = require('../models/User');

// Require Item model in our routes module
//var Item = require('../models/Item');

// Defined store route
userRouter.route('/add/post').post(function (req, res) {
  
  var user = new User(req.body);
      user.save()
    .then(user => {
    res.json(user);
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
userRouter.route('/').get(function (req, res) {
  User.find(function (err, usr){
    if(err){
      console.log(err);
    }
    else {
      res.json(usr);
    }
  });
});
/*
// Defined edit route
itemRouter.route('/edit/:id').get(function (req, res) {
  var id = req.params.id;
  Item.findById(id, function (err, item){
      res.json(item);
  });
});

//  Defined update route
itemRouter.route('/update/:id').post(function (req, res) {
  Item.findById(req.params.id, function(err, item) {
    if (!item)
      return next(new Error('Could not load Document'));
    else {
      // do your updates here
      item.item = req.body.item;

      item.save().then(item => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
itemRouter.route('/delete/:id').get(function (req, res) {
  Item.findByIdAndRemove({_id: req.params.id},
       function(err, item){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});
*/
module.exports = userRouter;