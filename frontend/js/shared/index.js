'use strict';
import angular from 'angular';
import uiRouter from 'angular-ui-router';

import layoutComponent from './layout.component.js';
import mainNavComponent from './main-nav.component.js';
import routerConfig from './shared.routes.js';

export default angular
    .module('shared', [uiRouter])
    .component('layout', layoutComponent)
    .component('mainNav', mainNavComponent)
    .config(routerConfig)
    .name;