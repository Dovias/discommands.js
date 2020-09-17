"use strict";

const {Collection} = require("discord.js");
const types = require("../util/types");
const commandHandler = require("../structures/commandHandler");

const handlerStorage = new Collection();


class handlerManager {
    constructor(client) {
        this.client = client;
        this.storage = handlerStorage;
    }
    create(prefix=".", dir) {
        types.check(arguments, ["String", "String"]);
        return new commandHandler(handlerStorage, prefix, dir);
    }
}

module.exports = handlerManager;