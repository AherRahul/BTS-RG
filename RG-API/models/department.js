const mongoose = require('mongoose');


const departmentSchema = mongoose.Schema({
    departmentName: {
        type: 'string',
        minlength: 2,
        maxlength: 32,
        required: true,
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Department", departmentSchema);