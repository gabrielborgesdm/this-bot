require('dotenv').config()

const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = "fatties"
const allowedChannelIds = ["754545328274931835"]
const commandsList = [
    {
        description: "Calls for help, cause we're all lost",
        method: (...attributes)=>{help(...attributes)},
        command: "help"
    },
    {
        description: "Gives you a picture of a fattie",
        method: (...attributes)=>{fatty(...attributes)},
        command: "fatty"
    }
]

function fatty (message) {
    message.channel.send("I'm trying, but it's so tough to find'em. A good fatty takes time aight?")
}

function help(commandsList, message) {
    let content = ""

    commandsList.forEach((command, index)=>{
        content += `${index + 1}.\` ${prefix} ${command.command}\`:  ${command.description}  \n`
    })
    message.channel.send(content)
}

const executeCommand = (message, commandText) => {
    let filteredCommand = commandsList.filter(command=> command.command === commandText)
    console.log( filteredCommand, commandText)
    filteredCommand = filteredCommand[0]
    
    if(filteredCommand){
        filteredCommand.method(commandsList, message)
    } else {
        message.channel.send("Ops! Command Not Found")
    } 
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
    
    if(!message.content.startsWith(prefix) || message.author.bot) return
    if(allowedChannelIds.indexOf(message.channel.id) === -1) return

    let command = message.content.replace(prefix, "")
    command = command.toLowerCase()
    command = command.split(" ")[1]
    executeCommand(message, command)
  
});



client.login('');
