var mongoose = require('mongoose');

var Location = mongoose.model('Location');
var Dealer = mongoose.model('Dealer');
var PropertyType = mongoose.model('PropertyType');
var Property = mongoose.model('Property');

module.exports.getProperties = function (req, res) {
    if (!req.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError: private profile"
        });
    } else {
        Property
            .find()
            .exec(function (err, properties) {
                res.status(200).json(properties);
            });
    }
}

module.exports.getLocations = function (req, res) {
    if (!req.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError: private profile"
        });
    } else {
        Location
            .find()
            .exec(function (err, locations) {
                res.status(200).json(locations);
            });
    }
}

module.exports.getDealers = function (req, res) {
    if (!req.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError: private profile"
        });
    } else {
        Dealer
            .find()
            .exec(function (err, dealers) {
                res.status(200).json(dealers);
            });
    }
}

module.exports.getPropertyTypes = function (req, res) {
    if (!req.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError: private profile"
        });
    } else {
        PropertyType
            .find()
            .exec(function (err, propertytypes) {
                res.status(200).json(propertytypes);
            });
    }
}

module.exports.addProperty = function (req, res) {

    if (!req.body) {
        console.log(req.body);
        console.log("error");
        return;
    }

    var property = new Property();

    property.location = req.body.location;
    property.price = req.body.price;
    property.beds = req.body.beds;
    property.size = req.body.size;
    property.type = req.body.type;
    property.addedTime = req.body.addedTime;
    property.addedBy = req.body.addedBy;

    property.save(function (err) {
        res.status(200);
        res.json({
            "message": "success"
        });
    });

}