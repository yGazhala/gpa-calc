'use strict';
// This module includes the entire application

import angular from 'angular';
import uiRouter from 'angular-ui-router';

import shared from './shared';
import gpaCalculator from './gpa-calculator';
import domino from './domino';

import routerConfig from './core.routes.js';

export default angular
    .module('core', [uiRouter, shared, gpaCalculator, domino])
    .config(routerConfig);