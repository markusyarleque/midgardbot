const { ObjectId } = require('mongodb');
const mongoose = require ('mongoose');

const autoSchema = new mongoose.Schema({
    
    trigger: { type: String, require: true  },
    response: { type: String, require: true },

})

const model = mongoose.model('Auto', autoSchema);

module.exports = model;