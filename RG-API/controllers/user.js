require('dotenv').config();
const Joi = require('@hapi/joi');
const User = require('../models/user');
const HttpStatus = require('http-status-codes');
const Helpers = require('../Helpers/helpers');
const jwt = require('jsonwebtoken');
const async = require("async");
var crypto = require("crypto");
var nodemailer = require("nodemailer");

module.exports = {

    // Get the admin info by id passed as PARAM
    async AdminById(req, res, next, id) {
        await User.findById(id).exec((error, user) => {
            if (error) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: "Error while getting the users"
                });
            }

            if (!user) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    error: "No User in DB"
                });
            }

            user.salt = user.encryPassword = user.createdAt = user.updatedAt = undefined;
            req.admin = user;
            next();
        });
    },

    // Get the user info by id passed as PARAM
    async UserById(req, res, next, id) {
        await User.findById(id).exec((error, user) => {
            if (error) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: "Error while getting the users"
                });
            }

            if (!user) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    error: "No User in DB"
                });
            }

            user.salt = user.encryPassword = user.createdAt = user.updatedAt = undefined;
            req.user = user;

            next();
        });
    },

    // Get the user info by email passed as PARAM
    async UserByEmailId(req, res, next, id) {
        await User.find({ email: id }).exec((error, user) => {
            if (error) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: "Error while getting the users"
                });
            }

            if (!user) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    error: "No User in DB"
                });
            }

            user.salt = user.encryPassword = user.createdAt = user.updatedAt = undefined;
            req.user = user;

            next();
        });
    },

    // Get the user info by token passed as PARAM
    async UserByToken(req, res, next, token) {
        if (!token) {
            return res.status(HttpStatus.FORBIDDEN).json({ message: 'No token provided' });
        }

        return jwt.verify(token, process.env.SECRETE, (err, decoded) => {
            if (err) {
                if (err.expiredAt < new Date()) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        message: 'Token has expired. Please login again',
                        token: null
                    });
                }
                next();
            }
            req.user = decoded.data;
            next();
        });
    },

    // returning the user by id to client-side
    async getUserById(req, res) {
        if (req.user) {
            return res.json(req.user);
        }
    },

    // returning the user by email to client-side
    async getUserByEmailId(req, res) {
        if (req.user) {
            return res.json(req.user);
        }
    },

    // Changing the password of user
    // when user already knows his previous password 
    async ChangePassword(req, res) {

        if (req.body.newPassword !== req.body.confirmPassword) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                error: 'new_password and confirmed password field mismatch'
            });
        }

        const schema = Joi.object().keys({
            cpassword: Joi.string().required(),
            newPassword: Joi.string()
                .min(5)
                .required(),
            confirmPassword: Joi.string()
                .min(5)
                .optional()
        });

        const { error, value } = schema.validate(req.body);
        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json({ msg: error.details });
        }

        const user = await User.findById({ _id: req.user._id });

        if (!user.authenticate(value.cpassword)) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Current password is incorrect'
            });
        }

        const newpassword = await user.securePassword(req.body.newPassword);

        await User.findByIdAndUpdate({ _id: req.user._id }, { $set: { encryPassword: newpassword } }, { new: true }, (error, user) => {
            if (error) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: 'Error while changing the password'
                });
            }

            if (!user) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    error: 'User not exist in DB to update password'
                });
            }

            return res.status(HttpStatus.OK).json({
                message: 'User password updated successfully'
            });
        });
    },

    // triggers an email to the user as he passed in req to reset the password
    async ResetPassword(req, res) {
        if (!req.body.email) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                error: 'No empty fields allowed'
            });
        }

        var schema = Joi.object().keys({
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        });

        const { error, value } = schema.validate(req.body);
        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json({ msg: error.details })
        }

        req.body.email = Helpers.lowerCase(req.body.email);

        await User.findOne({ email: req.body.email }).exec((error, user) => {
            if (error) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: "Error Occurred..!!"
                });
            }

            if (!user) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    error: "Email not exist in DB"
                });
            }

            if (user) {
                user.createdAt = user.updatedAt = undefined;

                const token = jwt.sign({ data: user }, process.env.SECRETE, {
                    expiresIn: '5h'
                });

                res.cookie('auth', token);
                async.waterfall([
                    function(done) {
                        crypto.randomBytes(20, function(err, buf) {
                            var passtoken = buf.toString('hex');
                            done(err, passtoken);
                        });
                    },
                    function(passtoken, done) {
                        User.findByIdAndUpdate({ _id: user._id }, { $set: { resetPasswordToken: passtoken, resetPasswordExpires: Date.now() + 3600000 } }, { new: true, useFindAndModify: false }, (error, user) => {
                            if (error) {
                                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                                    error: "Unable to update reset password token"
                                });
                            }

                            if (!user) {
                                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                                    error: "Unable to find user"
                                });
                            }

                            done(error, token, user);
                        });
                    },
                    function(passtoken, user, done) {
                        var smtpTransport = nodemailer.createTransport({
                            service: 'Gmail',

                            auth: {
                                user: "thecakeshop369@gmail.com",
                                pass: process.env.GMAILPW
                            }
                        });

                        var mailOptions = {
                            to: user.email,
                            from: 'thecakeshop369@gmail.com',
                            subject: 'BTS Communicate Password Reset',
                            text: 'You are receiving this because you have requested the reset of the password for your account.\n\n' +
                                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                                'http://localhost:5050/api/rgapp/reset/' + passtoken + '\n\n' +
                                'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                        };
                        smtpTransport.sendMail(mailOptions, function(error, info) {
                            console.log('mail sent');
                            req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
                            done(err, 'done');
                        });
                    }
                ], function(err) {
                    if (err) {
                        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                            error: "Failed to send mail"
                        });
                    }
                });
            }

            return res.status(HttpStatus.OK).json({
                message: "Password reset email send"
            });
        });
    },

    // link shared in email with user he can access this method to resetting the password
    async Reset(req, res) {
        if (!req.user) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: "Unable to reset password"
            });
        }

        if (!req.body.password) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                error: "Empty password not allowed"
            });
        }

        const schema = Joi.object().keys({
            password: Joi.string()
                .min(5)
                .required()
        });

        const { error, value } = schema.validate(req.body);
        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json({ msg: error.details });
        }

        const user = await User.findById({ _id: req.user._id });

        var userToSave = new User(user);

        const password = await userToSave.securePassword(req.body.password);

        await User.findByIdAndUpdate({ _id: req.user._id }, { $set: { encryPassword: password } }, { new: true }, (error, user) => {
            if (error) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: 'Error while changing the password'
                });
            }

            if (!user) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    error: 'User not exist in DB to update password'
                });
            }

            return res.status(HttpStatus.OK).json({
                message: 'User password updated successfully'
            });
        });
    },

    // deleting the user find by id 
    // Only Admin can access
    async deleteUser(req, res) {
        if (req.user) {
            await User.deleteOne({ _id: req.user._id }).exec((error, output) => {
                if (error) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        error: "Error while deleting user"
                    });
                }

                if (output.deletedCount != 1) {
                    return res.status(HttpStatus.BAD_REQUEST).json({
                        error: "Unable to delete user"
                    });
                }

                return res.json({
                    message: "User Deleted"
                });
            });
        }
    },

    // get all the user 
    // Only Admin can access
    async getAllUsers (req, res) {
        await User.find().exec((error, users) => {
            if (error) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: "Error while getting the users"
                });
            }

            if (!users) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    error: "No User in DB"
                });
            }

            for (var i = 0; i < users.length; i++) {
                users[i].salt = users[i].encryPassword = users[i].createdAt = users[i].updatedAt = undefined;
            }

            return res.json(users);
        });
    },

    // Update the user
    // Only Admin can access
    async UpdateUser(req, res) {

        var schema = Joi.object().keys({
            firstname: Joi.string().alphanum().min(3).max(30).required(),
            lastname: Joi.string().alphanum().min(3).max(30).required(),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        });

        const { error, value } = schema.validate(req.body);
        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json({ msg: error.details })
        }

        const userEmail = await User.find({
            email: Helpers.lowerCase(req.body.email)
        });
    }
}
