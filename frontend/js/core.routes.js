'use strict';

routerConfig.$inject = ['$urlRouterProvider'];

// The default state is 'home/gpa-calc'
function routerConfig($urlRouterProvider) {
    $urlRouterProvider.otherwise('home/gpa-calc');
}

export default routerConfig;
