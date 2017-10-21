var mongo = require('mongoose');
var Schema = mongo.Schema;
var bcrypt = require('bcrypt-nodejs');

var User = new Schema({
    "credentials": {
        "local": {
            "username": String,
            "password": String
        },
        "facebook": mongo.Schema.Types.Mixed, // We could - and probably should - validate further but if we just use 'passport-facebook', we should be good.
        "google": mongo.Schema.Types.Mixed, // We could - and probably should - validate further but if we just use 'passport-google-oauth', we should be good.
        "twitter": mongo.Schema.Types.Mixed, // We could - and probably should - validate further but if we just use 'passport-twitter', we should be good.
        "instagram": mongo.Schema.Types.Mixed // We could - and probably should - validate further but if we just use 'passport-instagram', we should be good.
    },
    "name": String // We could get a little bit more crazy with the name; creating virtuals for full name and tracking first, middle, and last - up to you guys...tbh, that seems unnecessary for a simple school project.
    "nickname": String,
    "purchases": [mongo.Schema.Types.ObjectId] // A list of Purchase Objects?
    "cart": [mongo.Schema.Types.ObjectId], // A list of Book Objects?
    "emails": [{
        "email": String,
        "default": Boolean
    }],
    "phones": [{
        "phone": String,
        "default": Boolean
    }]
    "settings": {
        "anonymous": Boolean // We could add more settings...
    },
    "addresses": [{
        "line_1": String,
        "line_2": String,
        "city": String,
        "province" String,
        "country": String,
        "default": Boolean // We could get crazier about addresses as well (i.e. billing, home, office, etc) - again, up to you guys; either way its a quick fix for the modeling
    }],
    "credit_cards": [{
        "number": String,
        "cvv": String,
        "name": String,
        "expiration": Date, // Though we could technically process this as a String as well, it usually best to keep it as Date to stay on top of potentially problematic (e.g. soon to expire) cards.
        "billing_address": {
            "line_1": String,
            "line_2": String,
            "city": String,
            "province": String,
            "country": String
        }
    }]
});

User.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

User.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongo.model("User", User);
