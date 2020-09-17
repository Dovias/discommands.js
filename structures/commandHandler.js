"use strict";

const fs = require("fs");
const path = require("path");
const discord = require("discord.js");
const commandManager = require("../managers/commandManager");

class commandHandler {
    constructor(handlerStorage, prefix, dir) {
        this.prefix = prefix;
        this.commands = new commandManager(this);
        if (dir) {
            dir = path.resolve(dir);
            const files = fs.readdirSync(dir);
            for (let i = 0; i < files.length; i++) {
                if (files[i].toLowerCase().endsWith(".js")) {
                    const command = require(path.resolve(dir, files[i]));
                    command.handler = this;
                    if (!command.name) {
                        command.name = files[i].substr(0, files[i].length - 3);
                    }
                    this.commands.storage.set(command.name, command);
                }
            }
        }
        handlerStorage.set(prefix, this);
    }
}

module.exports = commandHandler