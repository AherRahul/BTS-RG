const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const resourceType = mongoose.Schema({
    resourceName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 32,
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model("ResourceType", resourceType);