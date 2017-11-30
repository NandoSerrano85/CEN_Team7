var express = require('express');
var app = express();
var userRouter = express.Router();

var User = require('../models/user');

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

// Defined edit route
userRouter.route('/edit/:id').get(function (req, res) {
  var id = req.params.id;
  User.findById(id, function (err, user){
      res.json(user);
  });
});

//  Update for Login Info
userRouter.route('/updateLogin/:id').post(function (req, res) {
  User.findById(req.params.id, function(err, user) {
    if (!user)
      return next(new Error('Could not load Document'));
    else {
      // do your updates here
      user.credentials.local.password = req.body.credentials.local.password;

      user.save().then(user => {
          res.json('Update complete');
      })
      .catch(err => {
          res.status(400).send("unable to update the database");
      });
    }
  });
});

//  Update for Personal Info
userRouter.route('/updatePersonal/:id').post(function (req, res) {
  User.findById(req.params.id, function(err, user) {
    if (!user)
      return next(new Error('Could not load Document'));
    else {
      // do your updates here
      user.name = req.body.name;
      user.nickname = req.body.nickname;
      user.emails[0].email = req.body.emails[0].email;
      user.phones = req.body.phones;

      user.save().then(user => {
          res.json('Update complete');
      })
      .catch(err => {
          res.status(400).send("unable to update the database");
      });
    }
  });
});

//  Update for Payment Info
userRouter.route('/updatePayment/:id').post(function (req, res) {
  User.findById(req.params.id, function(err, user) {
    if (!user)
      return next(new Error('Could not load Document'));
    else {
      // do your updates here
      console.log(req.body);
      user.credit_cards = req.body.credit_cards;

      user.save().then(user => {
          res.json('Update complete');
      })
      .catch(err => {
          res.status(400).send("unable to update the database");
      });
    }
  });
});

//  Update for Address Info
userRouter.route('/updateAddress/:id').post(function (req, res) {
  User.findById(req.params.id, function(err, user) {
    if (!user)
      return next(new Error('Could not load Document'));
    else {
      // do your updates here
      console.log(req.body);
      user.addresses = req.body.addresses;

      user.save().then(user => {
          res.json('Update complete');
      })
      .catch(err => {
          res.status(400).send("unable to update the database");
      });
    }
  });
});
/*
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
