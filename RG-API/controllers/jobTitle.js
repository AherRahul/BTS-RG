const HttpStatus = require('http-status-codes');
const JobTitle = require('../models/jobTitle');
const Joi = require('@hapi/joi');
const Helpers = require('../Helpers/helpers');
const { GetDepartmentById } = require('./department');

module.exports = {
    async JobTitleByID (req, res, next, Id) {
        JobTitle.findById(Id).exec((error, jobTitle) => {
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
            return res.status(HttpStatus.CONFLICT).json({
                error: 'Job Title already exist with selected department name..!!'
            });
        }

        req.body.jobTitle = Helpers.firstUpper(req.body.jobName);
        jobTitle = new JobTitle(req.body);

        await jobTitle.save((error, jobTitle) => {
            if (error || !jobTitle) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: error.message,
                    message: 'Unable to save job title'
                });
            }

            jobTitle.createdAt = jobTitle.updatedAt = jobTitle.__v = undefined;

            return res.status(HttpStatus.OK).json({
                message: 'Job Title saved successfully..!!',
                jobTitle: jobTitle
            });
        });
    },

    async UpdateJobTitleById (req, res) {
        var schema = Joi.object().keys({
            jobName: Joi.string().min(3).max(32).required(),
            departmentId: Joi.string().required()
        });

        const { error, value } = schema.validate(req.body);
        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json({ msg: error.details });
        }
        
        await JobTitle.findOneAndUpdate (
            { _id: req.jobTitle._id },
            {
                $set: {
                   jobName: Helpers.firstUpper(req.body.jobName),
                   departmentId: req.body.departmentId
                }
            },
            { new: true },
            ( error, jobTitle) => {
                if (error) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        error: 'Error while updating job title..!!'
                    });
                }

                if (!jobTitle) {
                    return res.status(HttpStatus.NOT_FOUND).json({
                        error: 'Job title not found..!!'
                    });
                }

                jobTitle.createdAt = jobTitle.updatedAt = jobTitle.__v = undefined;

                return res.status(HttpStatus.OK).json({
                    message: 'job title updated successfully..!!',
                    jobTitle: jobTitle
                });
            }
        );
    },

    async DeleteJobTitleById (req, res) {
        if (req.jobTitle.jobName) {
            await JobTitle.deleteOne({ _id: req.jobTitle._id }).exec((error, output) => {
                if (error) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        error: 'Error while deleting jobTitle..!!'
                    });
                }

                if (output.deletedCount != 1) {
                    return res.status(HttpStatus.BAD_REQUEST).json({
                        error: 'Unable to delete jobTitle..!!'
                    });
                }

                return res.status(HttpStatus.OK).json({
                    message: 'jobTitle deleted successfully..!!'
                });
            });
        }
    }
}