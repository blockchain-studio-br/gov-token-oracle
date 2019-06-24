
const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bluebird = require('bluebird');

mongoose.Promise = bluebird;
global.db = mongoose.connect('mongodb://127.0.0.1:27017/govtoken_oracle', {useNewUrlParser: true});

var app = express();

app.use(express.static('./public'));
app.use(bodyParser.json());

consign({cwd: 'app'})
    .include('api')
    .then('routes')
    .into(app);

module.exports = app;