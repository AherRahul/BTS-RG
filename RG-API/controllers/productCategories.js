const HttpStatus = require('http-status-codes');
const async = require("async");
const ProductCategories = require('../models/productCategories');
const Joi = require('@hapi/joi');
const Helpers = require('../Helpers/helpers');

module.exports = {
    async ProductCategoriesByID (req, res, next, Id) {
        await ProductCategories.findById(Id).exec((error, productCategory) => {
            if (error) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: "Error while getting product category..!!"
                });
            }

            if (!productCategory) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    error: "Product category not found..!!"
                });
            }

            productCategory.createdAt = productCategory.updatedAt = productCategory.__v = undefined;

            req.productCategory = productCategory;
            next();
        });
    },

    async GetProductCategoriesById (req, res) {
        if (req.productCategory) {
            return res.json(req.productCategory);
        }
    },

    async GetAllProductCategories (req, res) {
        await ProductCategories.find().populate('productOwnerId.ownerId').populate('resourceTypeId').exec((error, productCategory) => {
            if (error) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: 'Error while fetching product categories..!!'
                });
            }

            if (!productCategory) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    error: 'No product category found..!!'
                });
            }

            for (let i = 0; i < productCategory.length; i++) {
                productCategory[i].createdAt = productCategory[i].updatedAt = productCategory[i].__v = undefined;
            }

            return res.status(HttpStatus.OK).json(productCategory);
        });
    },

    async CreateProductCategories (req, res) {
        var schema = Joi.object().keys({
            categoryName: Joi.string().min(3).max(30).required(),
            categoryCode: Joi.string().min(3).max(30).required(),
            resourceTypeId: Joi.string().required(),
            productOwnerId: Joi.object(),
            note: Joi.string().min(0).max(250)
        });

        const { error, value } = schema.validate(req.body);
        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json({ msg: error.details });
        }

        const prodCategory = await ProductCategories.findOne({
            categoryName: Helpers.firstUpper(req.body.categoryName)
        });
        if (prodCategory) {
            return res.status(HttpStatus.CONFLICT).json({
                error: "Product category already exist..!!"
            });
        }

        req.body.categoryCode = Helpers.allUpper(req.body.categoryCode);
        req.body.categoryName = Helpers.firstUpper(req.body.categoryName);
        
        var productCategory = new ProductCategories(req.body);

        await productCategory.save((error, productCategory) => {
            if (error || !productCategory) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: 'Unable to save product category..!!'
                });
            }

           productCategory.createdAt = productCategory.updatedAt = productCategory.__v = undefined;

            return res.status(HttpStatus.OK).json({
                message: 'Product category saved..!!',
                productCategory: productCategory
            });
        });
    },

    async UpdateProductCategoriesById (req, res) {
        var schema = Joi.object().keys({
            categoryName: Joi.string().min(3).max(30).required(),
            resourceTypeId: Joi.string().required(),
            productOwnerId: Joi.object(),
            categoryCode: Joi.string().min(3).max(30).required(),
            note: Joi.string().min(0).max(250)
        });

        const { error, value } = schema.validate(req.body);
        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json({ msg: error.details });
        }

        req.body.categoryCode = Helpers.allUpper(req.body.categoryCode);
        req.body.categoryName = Helpers.firstUpper(req.body.categoryName);
    
        productCategory = req.productCategory;

        await ProductCategories.findByIdAndUpdate(
            {_id: productCategory._id},
            {
                $set: { 
                    categoryName: req.body.categoryName, 
                    resourceTypeId: req.body.resourceTypeId,
                    categoryCode: req.body.categoryCode,
                    note: req.body.note
                },
                $push: {
                    productOwnerId: req.body.productOwnerId
                }
            },
            { new: true }, 
            (error, productCategory) => {
                if (error) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        error: 'Error while changing product category..!!'
                    });
                }

                if (!productCategory) {
                    return res.status(HttpStatus.NOT_FOUND).json({
                        error: 'Product category not found..!!'
                    });
                }

                productCategory.createdAt = productCategory.updatedAt = productCategory.__v = undefined;

                return res.status(HttpStatus.OK).json({
                    message: 'Product category updated successfully..!!',
                    productCategory: productCategory
                });
            }
        );
    },

    async DeleteProductCategoriesById(req, res) {
        if (req.productCategory.categoryName) {
            await ProductCategories.deleteOne({ _id: req.productCategory._id}).exec((error, output) => {
                if (error) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        error: 'Error while deleting product category..!!'
                    });
                }

                if (output.deletedCount != 1) {
                    return res.status(HttpStatus.BAD_REQUEST).json({
                        error: 'Unable to delete product category..!!'
                    });
                }

                return res.status(HttpStatus.OK).json({
                    message: "Product category deleted successfully..!!"
                });
            });
        }
    }
}
