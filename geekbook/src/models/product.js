var mongo = require('mongoose');
var Schema = mongo.Schema;

var Product = new Schema({
    "id": Number,
    "image": String,
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
        "timestamp": { type: Date, default: Date.now }
    }],
    "comments": [{
        "user": mongo.Schema.Types.ObjectId,
        "message": String,
        "timestamp": { type: Date, default: Date.now }
    }]
});

/*
* DEBUG ONLY
* Initializes a Product model containing
* garbage data.
*/
Product.methods.makeRandom = function(len){
  this.title = randomString(len + 4);
  this.isbn = randomString(len + 6);
  this.author.name = randomString(len + 2);
  this.author.bio = randomString(len + 3);
  this.description = "This is a test document";
  this.pages = (len % 1000) + 300;

  for (var i = 0; i < len + 1; i++)
    this.genres.push( randomString(len) );

  this.comments = [{ message: "This is a test document" }];
  this.ratings = [{ rating: (len % 5) + 1 }];
  this.ratings.message = 'This is a test document';
};

var randomString = function(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
module.exports = mongo.model('Product', Product);
