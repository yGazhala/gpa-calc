'use strict';

import angular from 'angular';
import ngMessages from 'angular-messages';
import uiRouter from 'angular-ui-router';

import NormalizeToArrayFactory from './normalize-to-array.factory.js';
import GpaDataService from './gpa-data.service.js';
import gpaCalcComponent from './gpa-calc.component.js';
import gradeComponent from './grade.component.js';
import routerConfig from './gpa-calulator.routes.js';

export default angular
    .module('gpaCalculator', [ngMessages, uiRouter])
    .factory('NormalizeToArrayFactory', NormalizeToArrayFactory)
    .service('GpaDataService', GpaDataService)
    .component('gpaCalc', gpaCalcComponent)
    .component('grade', gradeComponent)
    .constant('FIREBASE_URI', 'https://gazhala-test.firebaseio.com/')
    .config(routerConfig)
    .name;
