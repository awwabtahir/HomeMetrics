var mongoose = require('mongoose');
var brain = require('brain.js');
var bodyParser = require('body-parser');

module.exports.predict = function (req, res) {

    var result = 0;
    var trainInput = [];

    for (var key in req.body) {
        if (req.body.hasOwnProperty(key)) {
            let obj = {};
            obj.input = { timeAdded: req.body[key].timeAdded, size: req.body[key].size, beds: req.body[key].beds};
            obj.output = { [req.body[key].price]: true };
            trainInput.push(obj);
        }
    }

    var net = new brain.NeuralNetwork();

    net.train(trainInput);

    var output = net.run({ timeAdded: 60, size: req.body[0].size, beds: req.body[0].beds });

    res.status(200).json(output);
}