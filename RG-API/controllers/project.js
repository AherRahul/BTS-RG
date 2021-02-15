const HttpStatus = require('http-status-codes');
const Project = require('../models/project');
const Client = require('../models/client');
const Joi = require('@hapi/joi');
const Helpers = require('../Helpers/helpers');

module.exports = {
    async ProjectByID (req, res, next, Id) {
        await Project.findById(Id).exec((error, project) => {
            if (error) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: "Error while getting project..!!"
                });
            }

            if (!project) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    error: "Project not found..!!"
                });
            }

            project.createdAt = project.updatedAt = project.__v = undefined;

            req.project = project;
            next();
        });
    },

    async GetProjectById (req, res) {
        if (req.project) {
            return res.status(HttpStatus.Ok).json(req.project);
        }
    },

    async GetAllProject (req, res) {
        await Project.find().populate('clientId').exec((error, project) => {
            if (error) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: 'Error while fetching project..!!'
                });
            }

            if (!project) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    error: 'Project not found..!!'
                });
            }

            for (let i = 0; i < project.length; i++) {
                project[i].createdAt = project[i].updatedAt = project[i].__v = undefined;
            }

            return res.status(HttpStatus.OK).json(project);
        });
    },

    async CreateProject (req, res) {
        var schema = Joi.object().keys({
            projectName: Joi.string().min(3).max(32).required(),
            projectCode: Joi.string().min(3).max(32).required(),
            clientId: Joi.string().required(),
            billable: Joi.boolean().required(),
            devStart: Joi.date().iso().greater(Date.now()),
            dr: Joi.date().iso().greater(Date.now()),
            qa: Joi.date().iso().greater(Date.now()),
            regression: Joi.date().iso().greater(Date.now()),
            cr: Joi.date().iso().greater(Date.now()),
            goLive: Joi.date().iso().greater(Date.now()),
            note: Joi.string().min(0).max(250)
        });

        const { error, value } = schema.validate(req.body);
        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json({ msg: error.details });
        }

        const proj = await Project.findOne({ 
            projectName: Helpers.firstUpper(req.body.projectName)
        });
        if (proj) {
            return res.status(HttpStatus.CONFLICT).json({ 
                error: 'project already exist..!!'
            });
        }

        req.body.projectName = Helpers.firstUpper(req.body.projectName);
        req.body.projectCode = Helpers.firstUpper(req.body.projectCode);

        var project = new Project(req.body);

        await project.save((error, project) => {
            if (error || !project) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: 'Unable to save project..!!'
                });
            }

            Client.findById(JSON.parse(JSON.stringify(project.clientId))).exec((error, proj) => {
                //console.log(proj);
                project.client = proj.clientName;

                project.createdAt = project.updatedAt = project.__v = undefined;

                console.log(project);

                return res.status(HttpStatus.OK).json({
                    message: 'Project created successfully..!!',
                    project: project
                });
            });
        });
    },

    async UpdateProjectById (req, res) {
        var schema = Joi.object().keys({
            projectName: Joi.string().min(3).max(32).required(),
            projectCode: Joi.string().min(3).max(32).required(),
            clientId: Joi.string().required(),
            billable: Joi.boolean().required(),
            devStart: Joi.Date(),
            dr: Joi.Date(),
            qa: Joi.Date(),
            regression: Joi.Date(),
            cr: Joi.Date(),
            goLive: Joi.Date(),
            note: Joi.string().min(0).max(250)
        });

        const { error, value } = schema.validate(req.body);
        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json({ msg: error.details });
        }

       req.body.projectName = Helpers.firstUpper(req.body.projectName);
       req.body.projectCode = Helpers.allUpper(req.body.projectCode);

       await Project.findByIdAndUpdate(
           { _id: req.project._id },
           {
               $set: {
                    projectName: req.body.projectName,
                    projectCode: req.body.projectCode,
                    clientId: req.body.clientId,
                    binary: req.body.binary,
                    devStart: req.body.devStart,
                    dr: req.body.dr,
                    qa: req.body.qa,
                    regression: req.body.regression,
                    cr: req.body.cr,
                    goLive: req.body.goLive,
                    note: req.body.note
               }
           },
           { new: true },
           (error, project) => {
               if (error) {
                   return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                       error: 'Error while updating project..!!'
                   });
               }

               if (!project) {
                   return res.status(HttpStatus.NOT_FOUND).json({
                       error: 'Project not able to be updated..!!'
                   });
               }

               project.createdAt = project.updatedAt = project.__v = undefined;

               return res.status(HttpStatus.OK).json({
                   message: 'Project updated successfully..!!',
                   project: project
               });
           }
       );
    },

    async DeleteProjectById (req, res) {
        if (req.project.projectName) {
            await Project.deleteOne({ _id: req.project._id}).exec((error, output) => {
                if (error) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        error: 'Error while deleting project..!!'
                    });
                }

                if (output.deletedCount != 1) {
                    return res.status(HttpStatus.BAD_REQUEST).json({
                        error: 'Unable to delete project..!!'
                    });
                }

                return res.status(HttpStatus.OK).json({
                    message: "project deleted successfully..!!"
                });
            });
        }
    }
} 