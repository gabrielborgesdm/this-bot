import commands from "./commands/commandsList.js"

export function executeCommand(client, message, commandAndParamters){
    let params = {
        client, 
        message, 
        commandAndParamters
    }

    let command = getCommand(commandAndParamters[0])
    if(command){
        command(params)
    } else {
        message.channel.send("Ops! Command Not Found...")
    }
}

function getCommand(commandText){
    
    let command = commands.filter(item=>item.command === commandText)
    return command[0] && command[0].method ? command[0].method : false
}