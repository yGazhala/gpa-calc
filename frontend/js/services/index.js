'use strict';
import angular from 'angular';

import NormalizeToArrayFactory from './normalize-to-array.factory.js';
import GpaDataService from './gpa-data.service.js';

export default angular
    .module('services', [])
    .factory('NormalizeToArrayFactory', NormalizeToArrayFactory)
    .service('GpaDataService', GpaDataService)
    .constant('FIREBASE_URI', 'https://gazhala-test.firebaseio.com/')
    .name;