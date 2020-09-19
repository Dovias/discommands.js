"use strict";

const types = require("../util/types");

class command {
    constructor(description="No description available.", callback, name, handler) {
        types.check(arguments, ["String", "Function", "String", require("../structures/commandHandler.js")]);
        this.handler = handler;
        this.name = name;
        this.description = description;
        this.execute = callback;
    }
    delete() {
        return this.handler.commands.storage.delete(this.name);
    }
}

module.exports = command;
