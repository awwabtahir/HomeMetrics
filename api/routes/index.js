var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
var ctrlData = require('../controllers/data');
var ctrlPredict = require('../controllers/predict');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

// data
router.get('/getProperties', auth, ctrlData.getProperties);
router.get('/getLocations', auth, ctrlData.getLocations);
router.get('/getDealers', auth, ctrlData.getDealers);
router.get('/getPropertyTypes', auth, ctrlData.getPropertyTypes);
router.post('/addProperty', ctrlData.addProperty);
router.post('/predict', ctrlPredict.predict);

module.exports = router;
