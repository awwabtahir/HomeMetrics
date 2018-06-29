var mongoose = require( 'mongoose' );

var locationSchema = new mongoose.Schema({
    location : {
        type: String,
        unique: true,
        required: true
    }
});

mongoose.model('Location', locationSchema);