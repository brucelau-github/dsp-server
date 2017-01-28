/**
 * Copyright (c) 2016 Topcoder Inc, All rights reserved.
 */
'use strict';

/**
 * Exposes the API's to manipulate drones in the system
 * This includes create, update and get a list of all the drones
 *
 * @author      TCSCODER
 * @version     1.0
 */

const ServiceRequestService = require('../services/ServiceRequestService');
const helper = require('../common/helper');

// Exports
module.exports = {
  getAll,
  getSingle,
};


/**
 * Get all the service requests
 *
 * @param req the request
 * @param res the response
 */
function* getAll(req, res) {
  yield helper.splitQueryToArray(req.query, 'statuses');
  res.json(yield ServiceRequestService.getAll(req.query));
}


/**
 * get single service request by id
 * @param req
 * @param res
 */
function * getSingle(req, res) {
  res.json(yield DroneService.getSingle(req.params.id));
}