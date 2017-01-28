/*
 * Copyright (C) 2016 TopCoder Inc., All Rights Reserved.
 */
'use strict';
/**
 * Module to generate test data
 *
 * @author      TSCCODER
 * @version     1.0
 */

require('./bootstrap');
const config = require('config');
const _ = require('lodash');
const logger = require('./common/logger');
const helper = require('./common/helper');
const models = require('./models');
const moment = require('moment');

const User = models.User;
const ServiceRequest = models.ServiceRequest;

let cityofwindsor;
const users = require('./data/users.json');
const serviceRequests = require('./data/AllServiceRequests.json');

// players json data
const co = require('co');

co(function*() {
  logger.info('deleting previous data');
  yield User.remove({});
  yield ServiceRequest.remove({});

    // encrypt password
  yield _.map(users, (u) => function* () {
    if (u.password) {
      u.password = yield helper.hashString(u.password, config.SALT_WORK_FACTOR);
    }
    return;
  });

  logger.info(`creating ${users.length} users`);
  const userDocs = yield User.create(users);
  
  logger.info(`creating ${serviceRequests.length} serviceRequests`);
  const serviceRequestDoc = yield ServiceRequest.create(serviceRequests);

  logger.info('data created successfully');
}).then(() => {
  logger.info('Done');
  process.exit();
}).catch((e) => {
  logger.error(e);
  process.exit();
});
