
import Discord from 'discord.js'
import { executeCommand } from "./models/Commands"
import { getCommandAndParamters } from "./models/Validation"
import { checkShouldStop }  from "./models/Permissions"

const client = new Discord.Client()
const token = process.env.client_token

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
})

client.on('message', message => {  
    if(checkShouldStop(message)) return
    let commandAndParamters = getCommandAndParamters(message.content)
    executeCommand(client, message, commandAndParamters) 
  
})

client.login(token) 
