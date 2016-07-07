'use strict';
routerConfig.$inject = ['$stateProvider'];
function routerConfig($stateProvider) {
    $stateProvider
        .state('gpa-calc', {
            parent: 'home',
            url: '/gpa-calc',
            template: '<gpa-calc grades-list="stateCtrl.gradesList"></gpa-calc>',
            // download data before rendering the state
            resolve: {
                gradesListPromise: ['GpaDataService', function(GpaDataService) {
                    return GpaDataService.getGradesList();
                }]
            },
            controller: GpaCalcStateController,
            controllerAs: 'stateCtrl'
        })
        .state('grade', {
            parent: 'gpa-calc',
            url: '/grade/:id',
            template: '<grade grade-data="stateCtrl.gradeData" grade-name="stateCtrl.gradeName"></grade>',
            // download data before rendering the state
            resolve: {
                gradePromise: ['GpaDataService', '$stateParams', function(GpaDataService, $stateParams) {

                    return GpaDataService.getGrade($stateParams.id);
                }],
                gradeNamePromise: ['GpaDataService', '$stateParams', function(GpaDataService, $stateParams) {

                    return GpaDataService.getGradeName($stateParams.id);
                }]
            },
            controller: GradeStateController,
            controllerAs: 'stateCtrl'
        })
}

GpaCalcStateController.$inject = ['gradesListPromise'];

function GpaCalcStateController(gradesListPromise) {
    this.gradesList = gradesListPromise;
}

GradeStateController.$inject = ['gradePromise', 'gradeNamePromise'];

function GradeStateController(gradePromise, gradeNamePromise) {
    this.gradeData = gradePromise;
    this.gradeName = gradeNamePromise.gradeName;
}

export default routerConfig;