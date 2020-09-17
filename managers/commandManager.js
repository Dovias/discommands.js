"use strict";

const {Collection} = require("discord.js");
const types = require("../util/types");
const command = require("../structures/command");

class commandManager {
    constructor(handler) {
        this.handler = handler;
        this.storage = new Collection();
    }
    register(name, desc, func) {
        types.check(arguments, ["String", "String", "Function"]);
        let cmdObject = new command(desc, func, name, this.handler);
        this.storage.set(name, cmdObject);
        return cmdObject;
    }
    unregister(name) {
        types.check(arguments, ["String"]);
        return this.storage.delete(name);
    }
}

module.exports = commandManager;