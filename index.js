const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js")
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits
const { User, Message, GuildMember, ThreadMember, Channel } = Partials
const express = require("express")
const app = express()
const { loadEvents } = require("./Handlers/eventHandler")
const { loadCommands }  = require("./Handlers/commandHandler")
require("dotenv").config()

const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages],
    partials: [User, Message, GuildMember, ThreadMember,  Channel]
})

 // express
 app.get('/', (req, res) => {
    res.send('EtariadBot is online')
  })


app.listen(80)

client.commands = new Collection()

client.login(process.env.token).then(() => {
    loadEvents(client)
    loadCommands(client)
})