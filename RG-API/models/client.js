const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
    clientName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 32,
        trim: true
    },
    clientColorCode: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 7,
        unique: true,
        trim: true
    },
    note: {
        type: String,
        minlength: 0,
        maxlength: 250,
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Client", clientSchema);