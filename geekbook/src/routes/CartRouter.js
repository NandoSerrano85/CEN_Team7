var express = require('express');
var router = express.Router();
var path = require('path');
var cors = require('cors');
var Book = require('../models/product');
var Cart = require('../models/cart');

router.get('/add-to-cart/:id', cors({origin: 'http://localhost:3000', credentials: true,}), function(req, res) {
    var id = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    Book.findById(id, function(err, product) {
        if (err) {
          res.json('Error count not add');
        }
        cart.add(product, id);
        req.session.cart = cart;
        req.session.save();
        res.json(req.session.cart);
    });
});

router.get('/reduce/:id', cors({origin: 'http://localhost:3000', credentials: true,}), function(req, res, next) {
    var id = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.reduceOne(id);
    req.session.cart = cart;
    res.redirect('http://localhost:3000/cart');
});

router.get('/remove/:id', cors({origin: 'http://localhost:3000', credentials: true,}), function(req, res, next) {
    var id = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.remove(id);
    req.session.cart = cart;
    res.redirect('http://localhost:3000/cart');
});

router.get('/shopping-cart', cors({origin: 'http://localhost:3000', credentials: true,}), function(req, res, next) {
    if (!req.session.cart) {
        return res.json({
          books: null,
        });
    }
    var cart = new Cart(req.session.cart);
    res.json({
        books: cart.generateArray(),
        totalPrice: cart.totalPrice,
        Qty: cart.totalQty,
    });
});

router.get('/checkout', cors({origin: 'http://localhost:3000', credentials: true,}), function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    res.json({
        total: cart.totalPrice,
    });
});


module.exports = router;
