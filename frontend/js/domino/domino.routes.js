'use strict';

routerConfig.$inject = ['$stateProvider'];
function routerConfig($stateProvider) {
    $stateProvider
        .state('domino', {
            parent: 'home',
            url: '/domino',
            template: '<domino></domino>'
        })
}

export default routerConfig;