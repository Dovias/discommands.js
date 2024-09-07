# Abandoned! ⛔
There are way better solutions than this nowadays (even Discord by that time introduced some API's to handle bot commands). Do not use this in production!

# discommands.js
discommands.js is an object oriented, lightweight command handler for [discord.js](https://www.npmjs.com/package/discord.js) library.

## How does it work?
This command handler modifies  [discord.js](https://www.npmjs.com/package/discord.js)'s MessageCreate action class and extends client object's
prototype to check if the sent message is command, before the "message" event is emitted.

## Compatibility
Since this module modifies the action class method, I can not guarantee its backwards or future compatibility
with discord.js library.
**Tested on discord.js 12.3.1**

## Features
* Since its [object oriented](https://en.wikipedia.org/wiki/Object-oriented_programming), its per client object based
* You can load commands from custom directories
* Or you can do manual command registration, unregistration using methods
## Bugs/Features:
Since its my first package ever published online, there could be some bugs. If you find some, or have an idea, contact me and i'll try
to implement it or fix it.
## Installation:
```
npm install discommands.js
```
**Node.js 12.0.0 or newer is required.**

## Usage
Since this command handler is object oriented, using this framework is quite easy!

#### Registering commands:
##### by using .register(cmdName, [cmdDescription], callback) method:
```js
require("discommands.js");
const discord = require("discord.js");
const client = new discord.Client();

const handler = client.commandHandlers.create("!");
const command = handler.commands.register("marco", "Replies to author: polo", (execMessage, args) => {
    execMessage.reply("Polo!");
});

client.login("TOKEN");
```
##### from custom directory, by using
##### Command(description, callback, [name], [cmdHandler]) constructor:

###### index.js:
```js
require("discommands.js")
const discord = require("discord.js")
const client = new discord.Client()

client.commandHandlers.create("!", "./commands/")

client.login("TOKEN")
```
###### ./commands/marco.js:
```js
const command = require("discommands.js")
const command = new command("description", (execMessage, args) => {
    execMessage.reply("Polo!")
})
```
#### Unregistering commands:
##### by using delete() or .unregister(cmdName) methods:
```js
require("discommands.js");
const discord = require("discord.js");
const client = new discord.Client();

const handler = client.commandHandlers.create("!");
//Self destructive command (one time use only)
const command = handler.commands.register("marco", "Replies to author: polo", (execMessage, args) => {
    execMessage.reply("Polo!");
    //delete() method (Returns true if deleted successfully)
    command.delete()
    //or unregister(cmdName) method (Returns true if deleted successfully)
    handler.commands.unregister(command.name)
});

client.login("TOKEN");
```

