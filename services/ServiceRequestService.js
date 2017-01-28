/**
 * Copyright (c) 2016 Topcoder Inc, All rights reserved.
 */
'use strict';

/**
 * ServiceRequest module API's
 *
 * @author      TCSCODER
 * @version     1.0
 */

const joi = require('joi');

const models = require('../models');

const ObjectId = require('../datasource').getMongoose().Types.ObjectId;

const ServiceRequest = models.ServiceRequest;
const helper = require('../common/helper');
const logger = require('../common/logger');
const errors = require('common-errors');
const _ = require('lodash');

// Exports
module.exports = {
  getAll,
  getSingle,
};


// the joi schema for search
getAll.schema = {
  entity: joi.object().keys({
    offset: joi.number().integer(),
    description: joi.string().min(1).max(100),
    street: joi.string().min(1).max(100),
    ward: joi.number().integer(),
    start_date: joi.date(),
    end_date: joi.date(),
    block: joi.number().integer(),
    limit: joi.number().integer().required(),
    sortBy: joi.string().valid(['department', 'method_received', '-created_date', 'block','street','ward']),
  	queryType: joi.string().valid(['fuzzy']),
  }).required(),
};

/**
 * Get a list of all the service requests
 */
function* getAll(entity) {
  const criteria = {};
  const sortBy = {};

  if(!_.isNil(entity.queryType) && entity.queryType === 'fuzzy') {
  	criteria.street = new RegExp('.*'+entity.street+'.*', "i");
  } else if (!_.isNil(entity.street)) {
    criteria.street = entity.street;
  }
  if (!_.isNil(entity.start_date) && !_.isNil(entity.end_date)) {
    const start_date = new Date(entity.start_date);
    const end_date = new Date(entity.end_date);
    criteria.created_date = { $gte: start_date, $lte: end_date };
  }
  if (!_.isNil(entity.block)) {
    criteria.block = entity.block;
  }
  if (!_.isNil(entity.ward)) {
    criteria.ward = entity.ward;
  }
  if (!_.isNil(entity.description)) {
    criteria.description = entity.description;
  } 
  if (!_.isNil(entity.sortBy)) {
    const name = entity.sortBy[0] === '-' ? entity.sortBy.substr(1) : entity.sortBy;
    const value = entity.sortBy[0] === '-' ? -1 : 1;
    sortBy[name] = value;
  }
  const docs = yield ServiceRequest.find(criteria).sort(sortBy).skip(entity.offset || 0).limit(entity.limit || 1000);
  return {
    total: yield ServiceRequest.find(criteria).count(),
    items: _.map(docs, (d) => _.pick(d, 'id','department','method_received','created_date','block','street','ward','description')),
      };
}

 /**
 * get single by id
 * @param id
 */
function* getSingle(id) {
  const sr = yield ServiceRequest.findOne({_id: id});
  if (!sr) {
    throw new errors.NotFoundError(`Current logged in provider does not have this service request , id = ${id}`);
  }
  return sr.toObject();
}
