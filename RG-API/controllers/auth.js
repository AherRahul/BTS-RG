require('dotenv').config();
const Joi = require('@hapi/joi');
const User = require('../models/user');
const HttpStatus = require('http-status-codes');
const Helpers = require('../Helpers/helpers');
const jwt = require('jsonwebtoken');
var crypto = require("crypto");
var async = require("async");
var passport = require("passport");
var nodemailer = require("nodemailer");
const expressJwt = require('express-jwt');

// Protected Routes
exports.IsSignedIn = expressJwt({
    secret: process.env.SECRETE,
    userProperty: "auth"
});

exports.authCtrl = {

    // Middleware to check if user is SuperAdmin or not
    async IsSuperAdmin(req, res, next) {

        if (req.auth.data.role !== 5) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                error: 'Insufficient Privileges'
            });
        }

        next();
    },

    // Middleware to check if user is Admin or not
    async IsAdmin(req, res, next) {

        if (req.auth.data.role !== 4) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                error: 'Insufficient Privileges'
            });
        }

        next();
    },

    // Middleware to check if user is DepartmentHead or not
    async IsDepartmentHead(req, res, next) {

        if (req.auth.data.role !== 3) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                error: 'Insufficient Privileges'
            });
        }

        next();
    },

    // Middleware to check if user is Sub-DepartmentHead or not
    async IsSubDepartmentHead(req, res, next) {

        if (req.auth.data.role !== 2) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                error: 'Insufficient Privileges'
            });
        }

        next();
    },

    // Middleware to check if user is Team-Lead or not
    async IsTeamLead(req, res, next) {

        if (req.auth.data.role !== 1) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                error: 'Insufficient Privileges'
            });
        }

        next();
    },

    // Creates an account for user with basic info without password by Admin
    // this will triggered an email to an user to setting up a password by it's own once Admin creates an account for him
    async registerUser(req, res) {

        var schema = Joi.object().keys({
            firstName: Joi.string().alphanum().min(3).max(30).required(),
            lastName: Joi.string().alphanum().min(3).max(30).required(),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            phone: Joi.string().length(10),
            department: Joi.string().min(3).max(15).required(),
            jobTitle: Joi.string().min(3).max(15).required(),
            isContractor: Joi.boolean(),
            resourceTypeId: Joi.object(),
            permission: Joi.number().min(0).max(8).required(),
            timeZone: Joi.string(),
            bookable: Joi.boolean().required(),
<<<<<<< HEAD
            skills: Joi.string().min(0).max(250).require(),
            sendMeMail: Joi.boolean(),
            isSetByAdmin: Joi.boolean().default(true),
=======
            skills: Joi.string().min(0).max(250).required(),
            sendMeMail: Joi.boolean()
>>>>>>> a8df479d3ef66fdbaf22de5a690ebd8c2d2ab3f4
        });

        const { error, value } = schema.validate(req.body);
        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json({ msg: error.details })
        }

        const userEmail = await User.findOne({
            email: Helpers.lowerCase(req.body.email)
        });
        if (userEmail) {
            return res
                .status(HttpStatus.CONFLICT)
                .json({ message: 'User already exist' });
        }

        req.body.firstName = Helpers.firstUpper(req.body.firstName);
        req.body.lastName = Helpers.firstUpper(req.body.lastName);
        req.body.email = Helpers.lowerCase(req.body.email);
        req.body.department = Helpers.firstUpper(req.body.department);        
        req.body.jobTitle = Helpers.firstUpper(req.body.jobTitle);
        //req.body.password = "bts@123";

        var user = new User(req.body);
        // Saving User To DB
        await user.save((error, user) => {

            if (error || !user) {
                return res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: 'Error occurred during user save..!!' });
            }

            if (user) {

                let { _id, firstName, lastName, email, permission, isSetByAdmin } = user;
                const userToSave = { _id, firstName, lastName, email, permission, isSetByAdmin };

                const token = jwt.sign( { data: userToSave }, process.env.SECRETE, {
                    expiresIn: '5h'
                });

                async.waterfall([
                    function(done) {
                        crypto.randomBytes(20, function(err, buf) {
                            var passToken = buf.toString('hex');
                            done(err, passToken);
                        });
                    },
                    function(passToken, done) {
                        user.resetPasswordToken = passToken;
                        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                        user.save(function(err) {
                            done(err, token, user);
                        });
                    },
                    function(passToken, user, done) {
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
                            subject: 'BTS Communicate Activate Email',
                            text: 'You are receiving this because you have to set the password for your account.\n\n' +
                                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
<<<<<<< HEAD
                                'http://localhost:5050/api/rgapp/reset/' + passToken + '\n\n' +
=======
                                'http://localhost:5050/api/rgapp/activateEmail/' + passtoken + '\n\n' +
>>>>>>> a8df479d3ef66fdbaf22de5a690ebd8c2d2ab3f4
                                'If you did not request this, please ignore this email and your password will remain unchanged.\n\n' +
                                'Thanks & Regards,\nBTS Admin'
                        };

                        smtpTransport.sendMail(mailOptions, function(error, info) {
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

                return res
                    .status(HttpStatus.CREATED)
                    .json({ message: 'User created successfully' });
            }
        });
    },

    // to log in user into system
    async LoginUser(req, res) {

        if (!req.body.email || !req.body.password) {
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: 'No empty fields allowed' });
        }

        var schema = Joi.object().keys({
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            password: Joi.string().min(5).max(15).required()
        });

        const { error, value } = schema.validate(req.body);
        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json({ msg: error.details })
        }

        req.body.email = Helpers.lowerCase(req.body.email);

        // Find out user form DB
        await User.findOne({ email: req.body.email }, (error, user) => {
            if (error) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: "Error while retrieving user"
                });
            }

            if (!user) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    error: "User Not Found in DB"
                });
            }

            if (!user.authenticate(req.body.password)) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    error: "E-mail and password do not match"
                });
            }

            user.salt = user.encryPassword = user.createdAt = user.updatedAt = user.__v = undefined;

            const token = jwt.sign({ data: user }, process.env.SECRETE, {
                expiresIn: '5h'
            });

            res.cookie('auth', token);

            res.profile = user;

            return res
                .status(HttpStatus.OK)
                .json({ message: 'Login successful', user, token });
        });
    }
}
