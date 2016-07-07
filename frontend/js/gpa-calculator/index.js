'use strict';

import angular from 'angular';
import ngMessages from 'angular-messages';
import uiRouter from 'angular-ui-router';

import services from '../services';

import gpaCalcComponent from './gpa-calc/gpa-calc.component.js';
import gradeComponent from './grade/grade.component.js';
import routerConfig from './gpa-calulator.routes.js';

export default angular
    .module('gpaCalculator', [ngMessages, uiRouter, services])
    .component('gpaCalc', gpaCalcComponent)
    .component('grade', gradeComponent)
    .config(routerConfig)
    .name;
