const HttpStatus = require('http-status-codes');
const async = require("async");
const ResourceType = require('../models/resourceType');
const Joi = require('@hapi/joi');
const Helpers = require('../Helpers/helpers');

module.exports = {
    async ResourceByID(req, res, next, Id) {
        await ResourceType.findById(Id).exec((error, resource) => {
            if (error) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: "Error while getting the ResourceType"
                });
            }

            if (!resource) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    error: "No Resource in DB"
                });
            }

            req.resourceType = resource;
            next();
        });
    },

    async GetResourceById(req, res) {
        if (req.resourceType) {
            return res.json(req.resourceType);
        }
    },

    async GetAllResources(req, res) {
        await ResourceType.find().exec((error, resources) => {
            if (error) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: "Error while getting all the Resources"
                });
            }

            if (!resources) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    error: "No Resource in DB"
                });
            }

            return res.status(HttpStatus.OK).json(resources);
        })
    },

    async CreateResource(req, res) {
        var schema = Joi.object().keys({
            resourceName: Joi.string().alphanum().min(3).max(30).required()
        });

        const { error, value } = schema.validate(req.body);
        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json({ msg: error.details })
        }

        const resource = await ResourceType.findOne({
            resourceName: Helpers.firstUpper(req.body.resourceName)
        });
        if (resource) {
            return res.status(HttpStatus.CONFLICT).json({
                error: "Resource already exist in DB"
            });
        }

        req.body.resourceName = Helpers.firstUpper(req.body.resourceName);

        var resourceType = new ResourceType(req.body);

        await resourceType.save((error, resource) => {
            if (error || !resource) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: "Unable to save resource type"
                });
            }

            return res.json({
                message: 'Resource type created successfully',
                resource: resource
            });
        });
    },

    async UpdateResourceById(req, res) {
        var schema = Joi.object().keys({
            resourceName: Joi.string().alphanum().min(3).max(30).required()
        });

        const { error, value } = schema.validate(req.body);
        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json({ msg: error.details })
        }

        var resource = await ResourceType.findOne({
            resourceName: Helpers.firstUpper(req.body.resourceName)
        });
        if (resource) {
            return res.status(HttpStatus.CONFLICT).json({
                error: "Resource already exist in DB"
            });
        }

        req.body.resourceName = Helpers.firstUpper(req.body.resourceName);

        resource = req.resourceType;

        await ResourceType.findByIdAndUpdate({ _id: resource._id }, { $set: { resourceName: req.body.resourceName } }, { new: true }, (error, resource) => {
            if (error) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: 'Error while changing the Resource name'
                });
            }

            if (!resource) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    error: 'Resource not exist in DB to update Resource name'
                });
            }

            return res.status(HttpStatus.OK).json({
                message: 'Resource name updated successfully',
                resource: resource
            });
        });
    },

    async DeleteResourceById(req, res) {
        if (req.resourceType) {
            await ResourceType.deleteOne({ _id: req.resourceType._id }).exec((error, output) => {
                if (error) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        error: "Error while deleting Resource"
                    });
                }

                if (output.deletedCount != 1) {
                    return res.status(HttpStatus.BAD_REQUEST).json({
                        error: "Unable to delete Resource"
                    });
                }

                return res.json({
                    message: "Resource Deleted"
                });
            });
        }
    }
}