'use strict';

import template from './grade.html';

let gradeComponent = {
    bindings: {
        grade: '<', // get data from the state controller

        // callbacks to parent gpa-calc component
        updateGradeName: '&',
        addGpaValue: '&',
        removeGpaValue: '&'
    },
    template: template,
    controller: GradeController
};

GradeController.$inject = ['NormalizeToArrayFactory', 'GpaDataService'];

function GradeController(NormalizeToArrayFactory, GpaDataService) {

    this.gradeData = NormalizeToArrayFactory(this.grade.gradeData);

    this.addStudent = (gradeId, student) => {
        GpaDataService.addStudent(gradeId, student).then((newStudent)=> {
            // update local data
            this.gradeData.push(newStudent);

            //update average gpa
            this.addGpaValue({value: student.gpa});
        })
    };

    this.removeStudent = (gradeId, student) => {
        GpaDataService.removeStudent(gradeId, student).then(()=> {
            // update local data
            this.gradeData.splice(this.gradeData.indexOf(student), 1);

            // update average gpa
            this.removeGpaValue({value: student.gpa})
        })
    }
}

export default gradeComponent;