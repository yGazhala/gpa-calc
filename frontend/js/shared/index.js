'use strict';
import angular from 'angular';
import uiRouter from 'angular-ui-router';

//import domino from '../domino';
//import gpaCalculator from '../gpa-calculator';

import layoutComponent from './layout/layout.component.js';
import routerConfig from './shared.routes.js';

export default angular
    .module('shared', [uiRouter])
    .component('layout', layoutComponent)
    .config(routerConfig)
    .name;