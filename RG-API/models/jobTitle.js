const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const jobTitleSchema = mongoose.Schema({
    jobName: {
        type: 'string',
        minlength: 3,
        maxlength: 32,
        required: true,
        trim: true
    },
    departmentId : {
        type: ObjectId,
        ref: 'Department',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("JobTitle", jobTitleSchema);