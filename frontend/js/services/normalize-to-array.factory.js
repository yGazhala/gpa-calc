"use strict";
// The application data were stored at the Firebase server as a map object
// with a simple key/value pair. To continue working with an array
// on the client side, we transform the data received from the server by this factory.

export default function NormalizeToArrayFactory() {

    return function(object) {
        if (isEmpty(object)) { return []; }
        if (Array.isArray(object)) { return object; }

        return Object.keys(object).map(key => {
            let normalizedObject = object[key];
            // save the key in the id property
            normalizedObject.id = key;

            return normalizedObject;
            });

        // Helper function for checking if an object is empty
        function isEmpty(object) {
            for (let key in object) {
                return false;
            }

            return true;
        }
    };
}