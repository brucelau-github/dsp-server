/*
 * Copyright (C) 2016 TopCoder Inc., All Rights Reserved.
 */
'use strict';
/**
 * The Provider model
 *
 * @author      TSCCODER
 * @version     1.0
 */

const mongoose = require('../datasource').getMongoose();

const Schema = mongoose.Schema;
const _ = require('lodash');

const ServiceRequestSchema = new Schema({
  department: {type: String, required: true},
  method_received: {type: String, required: true},
  created_date: {type: Date, required: true},
  block: {type: Number, required: true},
  street: {type: String, required: true},
  ward: {type: Number, required: true},
  description: {type: String, required: true},
});


if (!ServiceRequestSchema.options.toObject) {
  ServiceRequestSchema.options.toObject = {};
}

/**
 * Transform the given document to be sent to client
 *
 * @param  {Object}   doc         the document to transform
 * @param  {Object}   ret         the already converted object
 * @param  {Object}   options     the transform options
 */
ServiceRequestSchema.options.toObject.transform = function (doc, ret, options) {
  const sanitized = _.omit(ret, '__v', '_id');
  sanitized.id = doc._id;
  return sanitized;
};

module.exports = {
  ServiceRequestSchema,
};

