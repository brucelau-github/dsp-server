/*
 * Copyright (C) 2016 TopCoder Inc., All Rights Reserved.
 */
'use strict';
/**
 * Init models
 *
 * @author      TSCCODER
 * @version     1.0
 */
const config = require('config');

const db = require('../datasource').getDb(config.db.url, config.db.poolSize);

// User model
const UserSchema = require('./User').UserSchema;

const User = db.model('User', UserSchema);

// ServiceRequest model
const ServiceRequestSchema = require('./ServiceRequest').ServiceRequestSchema;

const ServiceRequest = db.model('ServiceRequest', ServiceRequestSchema);

module.exports = {
  User,
  ServiceRequest,
};
