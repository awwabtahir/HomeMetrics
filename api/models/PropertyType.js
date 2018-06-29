var mongoose = require( 'mongoose' );

var propertyTypeSchema = new mongoose.Schema({
    type : {
        type: String,
        unique: true,
        required: true
    }
});

mongoose.model('PropertyType', propertyTypeSchema);