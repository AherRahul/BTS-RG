const HttpStatus = require('http-status-codes');
const JobTitle = require('../models/jobTitle');
const Joi = require('@hapi/joi');
const Helpers = require('../Helpers/helpers');
const { GetDepartmentById } = require('./department');

module.exports = {
    async JobTitleByID (req, res, next, Id) {
        JobTitle.findById(Id).exec((err, jobTitle) => {
            if (error) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: 'Error while getting Job Title..!!'
                });
            }

            if (!jobTitle) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    error: 'Job Title not found..!!'
                });
            }

            jobTitle.createdAt = jobTitle.updatedAt = jobTitle.__v = undefined;

            req.jobTitle = jobTitle;
            next();
        });
    },

    async GetJobTitleById (req, res) {
        if (req.jobTitle) {
            return res.status(HttpStatus.OK).json(req.jobTitle);
        }
    },

    async GetAllJobTitle (req, res) {
        await JobTitle.find().exec((error, jobTitles) => {
            if (error) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: 'Error while getting job titles..!!'
                });
            }

            if (!jobTitles) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    error: 'Job Title not found..!!'
                })
            }

            for (let i = 0; i < jobTitles.length; i++) {
                jobTitles[i].createdAt = jobTitles[i].updatedAt = jobTitles[i].__v = undefined;
            }

            return res.status(HttpStatus.OK).json(jobTitles);
        });
    },

    async GetAllJobTitleByDepartmentId (req, res) {
        await JobTitle.find( { "departmentId": req.department._id } ).exec(( error, jobTitles ) => {
            if (error) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: 'Error while getting job titles..!!'
                });
            }

            if (!jobTitles) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    error: 'Job Title not found..!!'
                })
            }

            for (let i = 0; i < jobTitles.length; i++) {
                jobTitles[i].createdAt = jobTitles[i].updatedAt = jobTitles[i].__v = undefined;
            }

            return res.status(HttpStatus.OK).json(jobTitles);
        });
    },

    async CreateJobTitle (req, res) {
        var schema = Joi.object().keys({
            jobName: Joi.string().min(3).max(32).required(),
            departmentId: Joi.string().required()
        });

        const { error, value } = schema.validate(req.body);
        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json({ msg: error.details });
        }

        var jobTitle = await JobTitle.findOne({
            $and: [
                {'jobName': Helpers.firstUpper(req.body.jobName)},
                { departmentId: req.body.departmentId }
            ]
        });
        if (jobTitle) {
            
        }

    }
}