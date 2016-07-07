'use strict';

import template from './grade.html';

let gradeComponent = {
    bindings: {
        // get data from the state controller
        gradeName: '<',
        gradeData: '<'
    },
    template: template,
    controller: GradeController
};

function GradeController() {

}

export default gradeComponent;
