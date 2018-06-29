var mongoose = require( 'mongoose' );

var propertySchema = new mongoose.Schema({
    location : {
        type: String
    },
    price : {
        type: String
    },
    beds : {
        type: String
    },
    size : {
        type: String
    },
    type : {
        type: String
    },
    addedTime : {
        type: String
    },
    addedBy: {
        type: String
    }
});

mongoose.model('Property', propertySchema);