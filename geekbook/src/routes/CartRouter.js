var express = require('express');
var router = express.Router();
var path = require('path')

var Book = require('../models/product');
var Cart = require('../models/cart');

router.route('/add-to-cart/:id').get(function(req, res) {
    var id = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Book.findById(id, function(err, product) {
        if (err) {
          res.json('Error count not add');
        }
        cart.add(product, id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.json('Added to cart');
    });
});

router.route('/reduce/:id').get(function(req, res, next) {
    var id = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    console.log(cart);
    cart.reduceOne(id);
    req.session.cart = cart;
    res.json('reduced by one');
});

router.route('/remove/:id').get(function(req, res, next) {
    var id = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    console.log(cart);
    cart.remove(id);
    req.session.cart = cart;
    res.json('removed from cart');
});

router.route('/shopping-cart').get(function(req, res, next) {
    if (!req.session.cart) {
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

router.route('/checkout').get(function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    var errMsg = req.flash('error')[0];
    res.render('/checkout', {
        total: cart.totalPrice,
        errMsg: errMsg,
        noError: !errMsg
    });
});

router.route('/checkout').get(function(req, res, next) {
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

module.exports = router;
