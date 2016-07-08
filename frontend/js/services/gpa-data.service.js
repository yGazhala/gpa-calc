'use strict';

GpaDataService.$inject = ['$http', 'NormalizeToArrayFactory', 'FIREBASE_URI'];

function GpaDataService($http, NormalizeToArrayFactory, FIREBASE_URI) {
    let uri = FIREBASE_URI;

    this.getGradesList = () => {

        return $http.get(uri + 'grades.json')
            .then((response) => {

                return NormalizeToArrayFactory(response.data);
            })
            .catch((error) => {
                console.error('Failed to load data from: ' + uri +'grades.json'
                    + ', error: ' + error.status + ' - ' + error.statusText);
            });
    };

    this.getGrade = (gradeId) => {

        return $http.get(uri + 'grades/' + gradeId + '.json')
            .then((response) => {

                return response.data;
            })
            .catch((error) => {
                console.error('Failed to load data from: ' + uri + 'grades/' + gradeId + '.json'
                    + ', error: ' + error.status + ' - ' + error.statusText);
            });
    };

    this.addGrade = () => {
        // Initialize a new grade with default data
        let newGrade = {
            "gradeName": "new grade"
        };

        return $http.post(uri + 'grades.json', newGrade)
            // When we add the new object to Firebase, we need
            // a key to identify this object in future.
            // This key was automatically created by Firebase
            // when we added the object at the first time.
            // All we need - is to save the key in "id" property of the object.
            .then((response) => {
                newGrade.gradeId = response.data.name;

                return newGrade;
            })
            // Now, we have the id, but it does not stored at the Firebase,
            // therefore we call an additional update method
            .then(() => {
                return this.updateGrade(newGrade)
            })
            .catch((error) => {
                console.error('Failed to load data from: ' + uri + 'grades.json'
                    + ', error: ' + error.status + ' - ' + error.statusText);
            });
    };

    this.updateGrade = (grade) => {

        return $http.put(uri + 'grades/' + grade.gradeId + '.json', grade)
            .then((response) => { return response.data; })
            .catch((error) => {
                console.error('Failed to load data from: ' + uri + 'grades/' + grade.gradeId + '.json'
                    + ', error: ' + error.status + ' - ' + error.statusText);
            });
    };

    this.removeGrade = (grade) => {

        return $http.delete(uri + 'grades/' + grade.gradeId + '.json')
            .then((response) => response.data) // response.data === null
            .catch((error) => {
                console.error('Failed to load data from: ' + uri + 'grades/' + grade.gradeId + '.json'
                    + ', error: ' + error.status + ' - ' + error.statusText);
            });

    };


    this.addStudent = (gradeId, student) => {

        return $http.post(uri + 'grades/' + gradeId + '/gradeData.json', student)
            .then((response) => {
                student.studentId = response.data.name;

                return student;
            })
            .then(() => {
                return $http.put(uri + 'grades/' + gradeId + '/gradeData/' + student.studentId + '.json', student)
            })
            .then((response) => response.data)
            .catch((error) => {
                console.error('Failed to load data from: ' + uri + 'grades/' + gradeId + '/gradeData.json'
                    + ', error: ' + error.status + ' - ' + error.statusText);
            });
    };

    this.removeStudent = (gradeId, student) => {

        return $http.delete(uri + 'grades/' + gradeId + '/gradeData/' + student.studentId + '.json')
            .then((response) => response.data) // response.data === null
            .catch((error) => {
                console.error('Failed to load data from: ' + uri + 'grades/' + gradeId + '/gradeData/'
                    + student.studentId + '.json' + ', error: ' + error.status + ' - ' + error.statusText);
            });
    };
}

export default GpaDataService;