const mongoose = require('mongoose');
const crypto = require('crypto');
const { v1: uuidv1 } = require('uuid');
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 32,
        trim: true
    },
    lastName: {
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
    encryPassword: {
        type: String,
        trim: true
    },
    // Hold the salt value
    salt: String,
    photoURL: {
        type: String,
        trim: true
    },
    phone: {
        type: Number,
        minlength: 10,
        maxlength: 10,
        trim: true
    },
    department: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 32,
        trim: true
    },
    jobTitle: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 32,
        trim: true
    },
    isContractor: {
        type: Boolean,
        default: false,
        required: true
    },
    resourceTypeId: [{
        resourceType: {
            type: ObjectId,
            ref: "Resource"
        }
    }],
    permission: {
        type: Number,
        default: 0,
        required: true
    },
    timeZone: {
        type: String,
        trim: true
    },
    bookable: {
        type: Boolean,
        default: true,
        required: true
    },
    skills: {
        type: String,
        minlength: 0,
        maxlength: 250,
        trim: true
    },
    status: {
        type: Date
    },
    sendMeEmail: {
        type: Boolean,
        default: true
    },
    resetPasswordToken: {
        type: String,
        trim: true
    },
    resetPasswordExpires: {
        type: Date
    },
<<<<<<< HEAD
    isSetByAdmin: {
        type: Boolean,
        default: true,
        required: true
=======
    isEmailActivated: {
        type: Boolean,
        default: false
>>>>>>> a8df479d3ef66fdbaf22de5a690ebd8c2d2ab3f4
    }
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