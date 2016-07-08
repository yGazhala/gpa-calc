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
            template: `<grade grade="stateCtrl.grade"
                            update-grade-name="$ctrl.updateGradeName(grade)"
                            add-gpa-value="$ctrl.addGpaValue(value)"
                            remove-gpa-value="$ctrl.removeGpaValue(value)"
                                ></grade>`,
            // download data before rendering the state
            resolve: {
                gradePromise: ['GpaDataService', '$stateParams', function(GpaDataService, $stateParams) {

                    return GpaDataService.getGrade($stateParams.id);
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

GradeStateController.$inject = ['gradePromise'];

function GradeStateController(gradePromise) {
    this.grade = gradePromise;
}

export default routerConfig;