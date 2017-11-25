var mongo = require('mongoose');
var Schema = mongo.Schema;

var Order = new Schema({
    "timestamp": Date,
    "total": Number,
    "user": mongo.Schema.Types.ObjectId,
    "price": {
        "tax": Number,
        "total": Number,
        "subtotal": Number
    },
    "items": [mongo.Schema.Types.ObjectId],
    "cart": Object,
    "billing": {
        "status": String, // Should enum cast into "paid", "unpaid", "pending", etc.; Suggestions?
        "card": {
            "number": String,
            "name": String,
            "cvv": String,
            "expiration": Date
        },
        "address": {
            "line_1": String,
            "line_2": String,
            "city": String,
            "province": String,
            "country": String
        },
        "email": String, // For receipt purposes
        "phone": String // For receipt purposes
    },
    "fulfillment": {
        "status": String, // Should enum cast into "fulfilled", "unfulfilled", "shipped", "pending_shipment", etc.; Suggestions?
        "provider": String, // Ideally we would 'enum' validate this value into "USPS", "FedEx", "UPS", etc., however because we do not know all providers in a given regions/area...this is currently unfeasible without third-party help
        "tracking": {
            "url": String, // Should url validate
            "number": String
        },
        "address": {
            "line_1": String,
            "line_2": String,
            "city": String,
            "province": String,
            "country": Stringf
        }
    }
});

module.exports = mongo.model("Order", Order);
