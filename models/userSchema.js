const mongoose = require ('mongoose');

const usersSchema = new mongoose.Schema({
    userId: { type: String, require: true, unique: true  },
    userName: { type: String, require: true, unique: true  },
    serverId: { type: String, require: true  },
})

const model = mongoose.model('Usuarios', usersSchema);

module.exports = model;

//type: string, number, boolean, buffer, date, array, Schema.Types.ObjectId
//default: 