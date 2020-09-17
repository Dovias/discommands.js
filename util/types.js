/*Checks types of elements of array,
* Supports classes, functions and objects,
* Not perfect way of doing that, but its
* ok since it's internal function, and
* not used for primitives*/

"use strict";

class types {
    static check(args, types) {
        if (args.length > types.length) {
            throw new Error("Unexpected Length Mismatch! Lengths of arrays are not equal.");
        }
        for (let i = 0; i < args.length; i++) {
            if (!args[i]) {
                continue;
            }
            let argType = args[i].constructor.name;
            let type = types[i];
            if (argType === "Function" && args[i].name !== "") {
                argType = args[i].name;
            }
            if (types[i].name) {
                type = types[i].name;
            }
            if (argType !== type) {
                throw new TypeError("Unexpected class or object type! Expected: " + type + ", but got: " + argType);
            }
        }
    }
}

module.exports = types;