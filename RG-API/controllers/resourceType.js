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
                    error: "Error while getting the Resource Type..!!"
                });
            }

            if (!resource) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    error: "No Resource type found..!!"
                });
            }

            resource.createdAt = resource.updatedAt = resource.__v = undefined;
            
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
                    error: "Error while fetching all the Resources Type..!!"
                });
            }

            if (!resources) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    error: "No Resource Type found..!!"
                });
            }

            for(let i = 0; i < resources.length; i++) {
                resources[i].createdAt = resources[i].updatedAt = resources[i].__v = undefined;
            }

            return res.status(HttpStatus.OK).json(resources);
        })
    },

    async CreateResource(req, res) {
        var schema = Joi.object().keys({
            typeName: Joi.string().min(3).max(30).required(),
            note: Joi.string().min(0).max(250)
        });

        const { error, value } = schema.validate(req.body);
        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json({ msg: error.details });
        }

        const resource = await ResourceType.findOne({
            typeName: Helpers.firstUpper(req.body.typeName)
        });
        if (resource) {
            return res.status(HttpStatus.CONFLICT).json({
                error: "Resource Type already exist..!!"
            });
        }

        req.body.typeName = Helpers.firstUpper(req.body.typeName);

        var resourceType = new ResourceType(req.body);

        await resourceType.save((error, resource) => {
            if (error || !resource) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: "Unable to save Resource type..!!"
                });
            }

            resource.createdAt = resource.updatedAt = resource.__v = undefined;
            
            return res.json({
                message: 'Resource type created successfully..!!',
                resource: resource
            });
        });
    },

    async UpdateResourceById(req, res) {
        var schema = Joi.object().keys({
            typeName: Joi.string().min(3).max(30).required(),
            note: Joi.string().min(0).max(250)
        });

        const { error, value } = schema.validate(req.body);
        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json({ msg: error.details })
        }

        req.body.typeName = Helpers.firstUpper(req.body.typeName);

        resource = req.resourceType;

        await ResourceType.findByIdAndUpdate(
            { _id: resource._id }, 
            { $set: { typeName: req.body.typeName, note: req.body.note } }, 
            { new: true }, 
            (error, resource) => {
            if (error) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: 'Error while changing the Resource Type..!!'
                });
            }

            if (!resource) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    error: 'Resource type does not exist in DB..!!'
                });
            }

            resource.createdAt = resource.updatedAt = resource.__v = undefined;

            return res.status(HttpStatus.OK).json({
                message: 'Resource type updated successfully..!!',
                resource: resource
            });
        });
    },

    async DeleteResourceById(req, res) {
        if (req.resourceType.typeName) {
            await ResourceType.deleteOne({ _id: req.resourceType._id }).exec((error, output) => {
                if (error) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        error: "Error while deleting Resource Type..!!"
                    });
                }

                if (output.deletedCount != 1) {
                    return res.status(HttpStatus.BAD_REQUEST).json({
                        error: "Unable to delete Resource Type..!!"
                    });
                }

                return res.json({
                    message: "Resource Type deleted successfully..!!"
                });
            });
        }
    }
}
