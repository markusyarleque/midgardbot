const { ObjectId } = require('mongodb');
const mongoose = require ('mongoose');

const prefixSchema = new mongoose.Schema({
    
    idserver: { type: String, require: true, unique: true },
    prefix: { type: String, require: true, default: '_' }

})

const model = mongoose.model('prefix', prefixSchema);

module.exports = model;
