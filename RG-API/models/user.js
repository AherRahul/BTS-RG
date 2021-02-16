const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 32,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 32,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    resetPasswordToken: {
        type: String,
        trim: true
    },
    resetPasswordExpires: {
        type: Date
    },
    encryPassword: {
        type: String,
        trim: true
    },
    // Hold the salt value
    salt: String,
    role: {
        type: Number,
        default: 0,
        required: true
    },
    department: {
        type: ObjectId,
        ref: "Department"
    },
    sendMeEmail: {
        type: Boolean,
        default: true
    },
    city: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: ''
    },
    isContractor: {
        type: Boolean,
        default: false
    },
    position: {
        type: ObjectId,
        ref: "Position"
    },
    resourceType: [{
        type: ObjectId,
        ref: "Resource"
    }]
}, { timestamps: true });

userSchema.virtual("password")
    .set(function(password) {
        this._password = password;
        this.salt = uuidv1();
        this.encryPassword = this.securePassword(password);
    })
    .get(function() {
        return this._password;
    })

userSchema.methods = {
    authenticate: function(plainPassword) {
        return this.securePassword(plainPassword) === this.encryPassword;
    },

    securePassword: function(plainPassword) {
        // If password is null entered by user the mongo DB thorw and error as password field is required
        if (!plainPassword) {
            return "";
        }

        return crypto.createHmac('sha256', this.salt)
            .update(plainPassword)
            .digest('hex');

    }
}

module.exports = mongoose.model("User", userSchema);