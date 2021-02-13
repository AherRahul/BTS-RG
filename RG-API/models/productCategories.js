const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productCategories = mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 32,
        trim: true
    },
    resourceTypeId: {
        type: ObjectId,
        ref: 'ResourceType'
    },
    productOwnerId: {
        type: [ObjectId],
        ref: 'User'
    },
    categoryCode: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
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

module.exports = mongoose.model("ProductCategories", productCategories);