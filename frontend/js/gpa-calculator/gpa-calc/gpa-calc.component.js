'use strict';

import template from './gpa-calc.html';

let gpaCalcComponent = {
    bindings: {
        gradesList: '<' // get data from the state controller
    },
    template: template,
    controller: GpaCalcController
};

GpaCalcController.$inject = ['GpaDataService', '$state'];

function GpaCalcController(GpaDataService, $state) {

    this.addAndMoveToNewGrade = () => {
        GpaDataService.addGrade()
            .then((newGrade) => {
                // update local data
                this.gradesList.push(newGrade);

                return newGrade;
            })
            .then((newGrade) => {
                $state.go('grade', {id: newGrade.gradeId})
            })
    };

    this.removeGrade = (grade) => {
        GpaDataService.removeGrade(grade).then(() => {
            // update local grades list
            this.gradesList.splice(this.gradesList.indexOf(grade), 1);

            // update average gpa
            this._gpaArr = extractGpaValues(this.gradesList);
            this.avgGpa = calculateAvgGpa(this._gpaArr);

            // If the user located in the state, that is going to be removed
            if($state.is('grade', {id: grade.gradeId})) {
                $state.go('gpa-calc');
            }
        })
    };

    this.updateGradeName = (grade) => {
        GpaDataService.updateGrade(grade).then((grade) => {
            // update local data
            let max = this.gradesList.length;

            for(let i = 0; i < max; i++) {
                if (this.gradesList[i].gradeId === grade.gradeId) {
                    this.gradesList[i] = grade;

                    return;
                }
            }
        })
    };

    this._gpaArr = extractGpaValues(this.gradesList);
    this.avgGpa = calculateAvgGpa(this._gpaArr);

    this.addGpaValue = (value) => {
        this._gpaArr.push(value);

        //update the result
        this.avgGpa = calculateAvgGpa(this._gpaArr);
    };

    this.removeGpaValue = (value) => {
        this._gpaArr.pop(value);

        //update the result
        this.avgGpa = calculateAvgGpa(this._gpaArr);
    };

    // internal functions
    function extractGpaValues (arrayOfObjects) {
        let gpaArr = [];
        let max = arrayOfObjects.length;

        for (let i = 0; i < max; i++) {
            let dataObj = arrayOfObjects[i].gradeData;

            for(let key in dataObj) {

                if (dataObj[key].gpa) {
                    gpaArr.push(dataObj[key].gpa)
                }
            }
        }

        return gpaArr;
    }

    function calculateAvgGpa (gpaArr) {
        let max = gpaArr.length;
        let gpaSum = 0;

        for (let i = 0; i < max; i++) {

            gpaSum += parseFloat(gpaArr[i]);
        }

        return (gpaSum / max).toFixed(2);
    }

}

export default gpaCalcComponent;