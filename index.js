/* discommands.js by Dovias.
*
* This command handler hooks into
* discord.js's MessageCreate action
* and client object's prototype to check
* if the message is command before the
* "message" event is emitted*/

"use strict";

const discord = require("discord.js");
const path = require("path");
const messageAction = require(path.dirname(require.resolve("discord.js")) + "/client/actions/MessageCreate");
const {Events} = require(path.dirname(require.resolve("discord.js")) + "/util/Constants");
const handlerManager = require("./managers/handlerManager");

Object.defineProperty(discord.Client.prototype, "commandHandlers", {
    get: function() {
        return new handlerManager(this);
    }
})
Object.defineProperty(messageAction.prototype, "handle", {
    value: function(data) {
        const client = this.client;
        const channel = client.channels.cache.get(data.channel_id);
        if (channel) {
            const existing = channel.messages.cache.get(data.id);
            if (existing) return { message: existing };
                const message = channel.messages.add(data);
                const user = message.author;
                let member = message.member;
                channel.lastMessageID = data.id;
            if (user) {
                user.lastMessageID = data.id;
                user.lastMessageChannelID = channel.id;
            }
            if (member) {
                member.lastMessageID = data.id;
                member.lastMessageChannelID = channel.id;
            }
    
            /**
             * Command handling before event triggers, if
             * it isn't command, "message" event triggers
             */
            const handlerStorage = client.commandHandlers.storage.get(message.content.charAt(0));
            if (message.content.length > 1 && handlerStorage && message.content.charAt(1) !== " " && message.content.charAt(1) !== "\n") {
                const args = message.content.toLowerCase().split("\n")[0].substr(1).split(" ");
                const command = handlerStorage.commands.storage.get(args[0]);
                if (command) {
                    command.execute(message, args);
                }
            } else {
                client.emit(Events.MESSAGE_CREATE, message);
            }
            return { message };
        }
        return {};
    }
})

module.exports = require("./structures/command.js");