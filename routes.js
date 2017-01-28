/* Defines the API routes
 *
 * @author      TOPCODER
 * @version     1.2
 */

const auth = require('./common/Auth.js');
const providerRole = require('./common/Permission').providerRole;
const pilotRole = require('./common/Permission').pilotRole;

module.exports = {
  '/login': {
    post: {
      controller: 'UserController',
      method: 'login',
    },
  },
  '/register': {
    post: {
      controller: 'UserController',
      method: 'register',
    },
  },
  '/login/social': {
    post: {
      controller: 'UserController',
      middleware: [auth()],
      method: 'registerSocialUser',
    },
  },
  '/forgot-password': {
    post: {
      controller: 'UserController',
      method: 'forgotPassword',
    },
  },
  '/reset-password': {
    post: {
      controller: 'UserController',
      method: 'resetPassword',
    },
  },
  //add service Request feature
  '/servicerequests': {
    get: {
      controller: 'ServiceRequestController',
      method: 'getAll',
    },
  },
	'/servicerequests/:id': {
	    get: {
	      controller: 'ServiceRequestController',
	      method: 'getSingle',
	    }
,	}
};