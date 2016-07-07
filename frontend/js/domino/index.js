'use strict';

import angular from 'angular';
import uiRouter from 'angular-ui-router';

import dominoComponent from './domino.component.js';
import routerConfig from './domino.routes.js';

export default angular
    .module('dominoModule', [uiRouter])
    .component('domino', dominoComponent)
    .config(routerConfig)
    .name;
