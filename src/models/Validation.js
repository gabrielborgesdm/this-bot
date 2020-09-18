
const prefix = process.env.prefix
const allowedChannels = process.env.allowed_channel_ids

export function getCommandAndParamters(commandString){
    commandString = commandString.replace(prefix, "")
    commandString = commandString.toLowerCase()
    let commandAndParamters = commandString.split(" ").slice(1)
    return commandAndParamters
}

export function getAllowedChannels(){
    allowedChannelsArray = allowedChannels
    let allowedChannelsArray = allowedChannelsArray.split(" ")
    return allowedChannelsArray
    
}