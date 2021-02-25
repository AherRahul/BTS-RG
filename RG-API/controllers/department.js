const HttpStatus = require('http-status-codes');
const Department = require('../models/department');
const Joi = require('@hapi/joi');
const Helpers = require('../Helpers/helpers');


module.exports = {
    async DepartmentByID (req, res, next, Id) {
        await Department.findById(Id).exec((error, department) => {
            if (error) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: 'Error while getting department..!!'
                });
            }

            if (!department) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    error: 'Department not found..!!'
                });
            }

            department.createdAt = department.updatedAt = department.__v = undefined;

            req.department = department;
            next();
        });
    },

    async GetDepartmentById (req, res) {
        if (req.department) {
            return res.status(HttpStatus.OK).json(req.department);
        }
    },

    async GetAllDepartment (req, res) {
        await Department.find().exec((error, departments) => {
            if (error) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: 'Error while getting all department..!!'
                });
            }

            if (!departments) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    error: 'Department not found..!!'
                });
            }

            for (let i = 0; i < departments.length; i++) {
                departments[i].createdAt = departments[i].updatedAt = departments[i].__v = undefined;
            }

            return res.status(HttpStatus.OK).json(departments);
        });
    },

    async CreateDepartment (req, res) {
        var schema = Joi.object().keys({
            departmentName: Joi.string().min(2).max(32).required()
        });

        const { error, value } = schema.validate(req.body);
        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json({ msg: error.details });
        }

        var department = await Department.findOne({ 
            departmentName: Helpers.firstUpper(req.body.departmentName)
        });
        if (department) {
            return res.status(HttpStatus.CONFLICT).json({ 
                error: 'Department already exist..!!'
            });
        }

        department = new Department(req.body);

        await department.save((error, department) => {
            if (error || !department) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: error.message,
                    message: 'Unable to save department..!!'
                });
            }

            department.createdAt = department.updatedAt = department.__v = undefined;

            return res.status(HttpStatus.OK).json({
                message: 'Department Saved..!!',
                department: department
            });
        });
    },

    async UpdateDepartmentById (req, res) {
        var schema = Joi.object().keys({
            departmentName: Joi.string().min(2).max(32).required()
        });

        const { error, value } = schema.validate(req.body);
        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json({ msg: error.details });
        }

        
        await Department.findByIdAndUpdate (
            { _id: req.department._id },
            { 
                $set: {
                    departmentName: req.body.departmentName
                }
            },
            { new: true },
            ( error, department ) => {
                if (error) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        error: 'Error while updating department..!!'
                    });
                }

                if (!department) {
                    return res.status(HttpStatus.NOT_FOUND).json({
                        error: 'Department not found..!!'
                    });
                }

                department.createdAt = department.updatedAt = department.__v = undefined;

                return res.status(HttpStatus.OK).json({
                    message: 'Department updated successfully..!!',
                    department: department
                });
            }
        );
    },

    async DeleteDepartmentById (req, res) {
        if (req.department.departmentName) {
            await Department.deleteOne({ _id: req.department._id }).exec((error, output) => {
                if (error) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        error: 'Error while deleting department..!!'
                    });
                }

                if (output.deletedCount != 1) {
                    return res.status(HttpStatus.BAD_REQUEST).json({
                        error: 'Unable to delete department..!!'
                    });
                }

                return res.status(HttpStatus.OK).json({
                    message: 'Department deleted successfully..!!'
                });
            });
        }
    }
}
