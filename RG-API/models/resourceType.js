const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const resourceType = mongoose.Schema({
    typeName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 32,
        trim: true
    },
    note: {
        type: String,
        minlength: 0,
        maxlength: 250,
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model("ResourceType", resourceType);