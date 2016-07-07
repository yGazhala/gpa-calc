'use strict';

import template from './gpa-calc.html';

let gpaCalcComponent = {
    bindings: {
        gradesList: '<' // get data from state controller
    },
    template: template,
    controller: GpaCalcController
};

GpaCalcController.$inject = ['GpaDataService'];

function GpaCalcController(GpaDataService) {

    this.addGrade = () => {
        GpaDataService.addGrade().then((newGrade) => {
            this.gradesList.push(newGrade);
        })
    }
}

export default gpaCalcComponent;