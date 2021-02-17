const HttpStatus = require('http-status-codes');
const Client = require('../models/client');
const Joi = require('@hapi/joi');
const Helpers = require('../Helpers/helpers');

module.exports = {
    async ClientByID (req, res, next, Id) {
        await Client.findById(Id).exec((error, client) => {
            if (error) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: 'Error while getting client..!!'
                });
            }

            if (!client) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    error: 'Client not found..!!'
                });
            }

            client.createdAt = client.updatedAt = client.__v = undefined;

            req.client = client;
            next();
        });
    },

    async GetClientById (req, res) {
        if (req.Client) {
            return res.status(HttpStatus.Ok).json(req.client);
        }
    },

    async GetAllClient (req, res) {
        await Client.find().exec((error, clients) => {
            if (error) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: 'Error while getting all clients..!!'
                });
            }

            if (!clients) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    error: 'No clients found..!!'
                });
            }

            for (let i = 0; i < clients.length; i++) {
                clients[i].createdAt = clients[i].updatedAt = clients[i].__v = undefined;
            }

            return res.status(HttpStatus.OK).json(clients);
        });
    },

    async CreateClient (req, res) {
        var schema = Joi.object().keys({
            clientName: Joi.string().min(3).max(32).required(),
            clientColorCode: Joi.string().min(4).max(7).required(),
            note: Joi.string().min(0).max(250)
        });

        const { error, value } = schema.validate(req.body);
        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json({ msg: error.details })
        }

        var client = await Client.findOne({ 
            clientName: Helpers.firstUpper(req.body.clientName)
        });
        if (client) {
            return res.status(HttpStatus.CONFLICT).json({ 
                error: 'Client already exist..!!'
            });
        }

        req.body.clientName = Helpers.firstUpper(req.body.clientName);

        client = new Client(req.body);

        await client.save((error, client) => {
            if (error || !client) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: error.message,
                    message: 'Unable to save client..!!'
                });
            }

            client.createdAt = client.updatedAt = client.__v = undefined;

            return res.status(HttpStatus.OK).json({
                message: 'Client saved..!!',
                client: client
            });
        });
    },

    async UpdateClientById (req, res) {
        var schema = Joi.object().keys({
            clientName: Joi.string().min(3).max(32).required(),
            clientColorCode: Joi.string().min(4).max(7).required(),
            note: Joi.string().min(0).max(250)
        });

        const { error, value } = schema.validate(req.body);
        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json({ msg: error.details })
        }

        req.body.clientName = Helpers.firstUpper(req.body.clientName);

        await Client.findByIdAndUpdate(
            { _id: req.client._id},
            {
                $set: {
                    clientName: req.body.clientName,
                    clientColorCode: req.body.clientColorCode,
                    note: req.body.note
                }
            },
            { new: true },
            (error, client) => {
                if (error) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        error: 'Error while updating the client..!!'
                    });
                }

                if (!client) {
                    return res.status(HttpStatus.NOT_FOUND).json({
                        error: 'Client clients not found..!!'
                    });
                }

                client.createdAt = client.updatedAt = client.__v = undefined;

                return res.status(HttpStatus.OK).json({
                    message: 'Client updatedAt updated successfully..!!',
                    client: client
                });
            }
        );
    },

    async DeleteClientById (req, res) {
        if (req.client.clientName) {
            await Client.deleteOne({ _id: req.client._id }).exec((error, output) => {
                if (error) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        error: 'Error while deleting client..!!'
                    });
                }

                if (output.deletedCount != 1) {
                    return res.status(HttpStatus.BAD_REQUEST).json({
                        error: 'Unable to delete client..!!'
                    });
                }

                return res.status(HttpStatus.OK).json({
                    message: "Client deleted successfully..!!"
                });
            });
        }
    }
}
