const { ObjectId } = require('mongodb');
const mongoose = require ('mongoose');

const autoSchema = new mongoose.Schema({
    
    idserver: { type: String, require: true, unique: true },
    tiempo: { type: String, require: true  },
    mensaje: { type: String, require: true },

})

const model = mongoose.model('Auto', autoSchema);

module.exports = model;