const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const projectSchema = mongoose.Schema({
    projectName: {
        type: 'string',
        minlength: 3,
        maxlength: 32,
        required: true,
        trim: true
    },
    projectCode : {
        type: 'string',
        minlength: 3,
        maxlength: 32,
        required: true,
        trim: true
    },
    clientId: {
        type: ObjectId,
        ref: 'Client'
    },
    billable: {
        type: 'boolean',
        default: true,
        required: true
    },
    devStart: {
        type: Date,
        min: Date.now()
    },
    dr: {
        type: Date,
        min: Date.now()
    },
    qa: {
        type: Date,
        min: Date.now()
    },
    regression: {
        type: Date,
        min: Date.now()
    },
    cr: {
        type: Date,
        min: Date.now()
    },
    goLive: {
        type: Date,
        min: Date.now()
    },
    note: {
        type: String,
        minlength: 0,
        maxlength: 250,
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);