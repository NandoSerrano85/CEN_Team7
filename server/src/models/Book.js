var mongo = require('mongoose');
var Schema = mongo.Schema;

var Book = new Schema({
    "title": String,
    "isbn": String,
    "author": {
        "name": String,
        "bio": String
    },
    "description": String,
    "pages": Number, // Random, but useful, I guess...
    "weight": {
        "amount": Number,
        "unit": {
            type: String,
            enum: ['lbs', 'kg'] // I imagine there are unit from measurement systems besides Imperial and Metric...but, idk if we should account for them for this project...lmk
        }
    },
    "publishing": {
        "release_date": Date,
        "publisher": String,
        // More publishing info....?
    },
    "price": {
        type: Number,
        min: 0
    },
    "sold": {
        type: Number,
        min: 0
    },
    "in_stock": {
        type: Number,
        min: 0
    },
    "genres": [String], // Some books may belong to multiple genres; in theory this should probably be an 'enum', but that would make this model significantly more difficult to manage and might inaccurately cast some books into unrelated genres.
    "ratings": [{
        "user": mongo.Schema.Types.ObjectId,
        "rating": {
            type: Number,
            min: 1,
            max: 5
        },
        "message": String,
        "timestamp": Date
    }],
    "comments": [{
        "user": mongo.Schema.Types.ObjectId,
        "message": String,
        "timestamp": Date
    }]
});

module.exports = mongo.model('Book', Book);
