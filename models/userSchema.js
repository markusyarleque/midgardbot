const { ObjectId } = require('mongodb');
const mongoose = require ('mongoose');

const usersSchema = new mongoose.Schema({

    username: { type: String, require: true, unique: true  },
    serverId: { type: String, require: true  },
    nivel: { type: Number, require: true, default: 0, unique: true },
    exp: { type: Number, require: true, default: 0, unique: true },
    marry: { type: String, require: true, default: 'Soltero(a)', unique: true },
    rep: { type: Number, require: true, default: 0, unique: true },
    pat: { type: Number, require: true, default: 0, unique: true },
    hug: { type: Number, require: true, default: 0, unique: true },
    sape: { type: Number, require: true, default: 0, unique: true },
    color: { type: String, require: true, default: '#607D8B', unique: true },
    frase: { type: String, require: true, default: 'No hay frase agregada', unique: true },
    foto: { type: Buffer, require: true, default: 'https://c.tenor.com/FLR3dFSlH1sAAAAC/bully-tierno.gif', unique: true },
    dinero: { type: Number, require: true, default: 0, unique: true },
    banco: { type: Number, require: true, default: 0, unique: true },
    total: { type: Number, require: true, default: 0, unique: true },
    work: { type: Date, require: true, default: Date.now, unique: true },
    crime: { type: Date, require: true, default: Date.now, unique: true },
    rob: { type: Date, require: true, default: Date.now, unique: true },
    daily: { type: Date, require: true, default: Date.now, unique: true },
    crep: { type: Date, require: true, default: Date.now, unique: true },
    ck: { type: Number, require: true, default: 0, unique: true },

})

const model = mongoose.model('Usuarios', usersSchema);

module.exports = model;

//type: string, number, boolean, buffer, date, array, Schema.Types.ObjectId
//default: fv