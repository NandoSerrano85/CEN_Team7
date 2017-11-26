var express = require('express');
var exp = express();
var router = express.Router();
var path = require('path')

var Book = require('../models/product');
var Cart = require('../models/cart');

router.get('/add-to-cart/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Book.findById(productId, function(err, product) {
        if (err) {
          return res.redirect('/');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        res.redirect('/');
    });
});

router.get('/reduce/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
});

router.get('/remove/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
});

router.get('/shopping-cart', function(req, res, next) {
    if (!req.session) {
        return res.json({
          books: null
        });
    }
    var cart = new Cart(req.session.cart);
    res.json({
        books: cart.generateArray(),
        totalPrice: cart.totalPrice
    });
});

router.get('/checkout',function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    var errMsg = req.flash('error')[0];
    res.render('shop/checkout', {
        total: cart.totalPrice,
        errMsg: errMsg,
        noError: !errMsg
    });
});

router.post('/checkout', function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);

    // var stripe = require("stripe")("sk_test_bgBdBuFAydIEVdepmjpaJKUy");
    //
    // stripe.charges.create({
    //     amount: cart.totalPrice * 100,
    //     currency: "usd",
    //     source: req.body.stripeToken, // obtained with Stripe.js
    //     description: "Test Charge"
    //     }, function(err, charge) {
    //         if (err) {
    //           req.flash('error', 'Não conseguimos finalizar sua compra!');
    //           return res.redirect('/checkout');
    //     }
    //     var order = new Order({
    //         user: req.user,
    //         cart: cart,
    //         address: req.body.address,
    //         name: req.body.name,
    //         paymentId: charge.id
    //     });
    //     order.save(function(err, result) {
    //         req.flash('success', 'Compra realizada com sucesso!');
    //         req.session.cart = null;
    //         res.redirect('/');
    //     });
    // });
});
