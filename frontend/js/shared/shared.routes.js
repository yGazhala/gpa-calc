'use strict';

routerConfig.$inject = ['$stateProvider'];
function routerConfig($stateProvider) {
    $stateProvider
        .state('home', {
            abstract: true,
            url: '/home',
            template: '<layout></layout>'
        })
}

export default routerConfig;