var mongo = require('mongoose');
var Schema = mongo.Schema;

var Book = new Schema({
    book: {
        type: String
    },
},{
    collection:'books'
});

module.exports = mongo.model("Book", Book);
