var mongoose = require( 'mongoose' );

var dealerSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    phone : {
        type: String,
        required: true
    },
    location : {
        type: String
    }
});

mongoose.model('Dealer', dealerSchema);