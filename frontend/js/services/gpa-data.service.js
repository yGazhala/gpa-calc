'use strict';

GpaDataService.$inject = ['$http', 'NormalizeToArrayFactory', 'FIREBASE_URI'];
function GpaDataService($http, NormalizeToArrayFactory, FIREBASE_URI) {
    let uri = FIREBASE_URI;

    this.getGrade = function(gradeId) {

        return $http.get(uri + '/' + gradeId + '.json')
            .then((response) => {

                return NormalizeToArrayFactory(response.data);
            })
            .catch((error) => {
                console.error('Failed to load data from: ' + uri + '/' + gradeId + '.json'
                    + ', error: ' + error.status + ' - ' + error.statusText);
            });
    };

    this.getGradesList = function() {

        return $http.get(uri + 'grades-list.json')
            .then((response) => {

                return NormalizeToArrayFactory(response.data);
            })
            .catch((error) => {
                console.error('Failed to load data from: ' + uri +'grades-list.json'
                    + ', error: ' + error.status + ' - ' + error.statusText);
            });
    };

    this.getGradeName = function(gradeId) {

        return $http.get(uri + 'grades-list/' + gradeId + '.json')
            .then((response) => {

                return response.data;
            })
            .catch((error) => {
                console.error('Failed to load data from: ' + uri + 'grades-list/' + gradeId + '.json'
                    + ', error: ' + error.status + ' - ' + error.statusText);
            });
    };

    this.addGrade = function() {
        // Setting the default name
        let newGrade = {
           "gradeName": "new grade"
        };

        return $http.post(uri + 'grades-list.json', newGrade)
            // When we add the new object to Firebase, we need
            // a key to identify this object in future.
            // This key was automatically created by Firebase
            // when we added the object at the first time.
            // All we need - is to save the key in "id" property of the object.
            .then((response) => {
                newGrade.id = response.data.name;

                return newGrade;
            })
            // Now, we have the id, but it does not stored at the Firebase,
            // therefore we implement an additional PUT method
            .then(() => {

                return $http.put(uri + 'grades-list/' + newGrade.id + '.json', newGrade)
            })
            .then((response) => { return response.data; })
            .catch((error) => {
                console.error('Failed to load data from: ' + uri + '.json'
                    + ', error: ' + error.status + ' - ' + error.statusText);
            });
    };

    /*
    this.addUser = function(newUser) {

        return $http.post(uri + '.json' + FIREBASE_SECRET, newUser)
            .then((response) => {
                // When we add the new object to FireBase, we need
                // a key to identify this object in future.
                // This key was automatically created by FireBase
                // when we added the object at the first time.
                // All we need - is to save the key in "id" property of the object.
                newUser.id = response.data.name;

                return newUser;
            })
            // Now, we have the id, but it does not stored at the FireBase,
            // therefore we implement an additional PUT method
            .then(() => {
                return $http.put(uri + '/' + newUser.id + '.json' + FIREBASE_SECRET, newUser)
            })
            .then((response) => response.data)
            .catch((error) => {
                console.error('Failed to load data from: ' + uri + '.json' + FIREBASE_SECRET
                    + ', error: ' + error.status + ' - ' + error.statusText);
            });
    };

    this.removeUser = function(user) {

        return $http.delete(uri + '/' + user.id + '.json' + FIREBASE_SECRET)
            .then((response) => response.data) // response.data === null
            .catch((error) => {
                console.error('Failed to load data from: ' + uri + '/' + user.id + '.json' + FIREBASE_SECRET
                    + ', error: ' + error.status + ' - ' + error.statusText);
            });
    };

    this.updateUser = function(user) {

        return $http.put(uri + '/' + user.id + '.json' + FIREBASE_SECRET, user)
            .then((response) => response.data)
            .catch((error) => {
                console.error('Failed to load data from: ' + uri + '/' + user.id + '.json' + FIREBASE_SECRET
                    + ', error: ' + error.status + ' - ' + error.statusText);
            });
    };*/
}

export default GpaDataService;
