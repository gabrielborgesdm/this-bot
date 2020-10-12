
const prefix = process.env.prefix
const allowedChannels = process.env.allowed_channel_ids

export function getCommandAndParamters(commandString){
    commandString = commandString.replace(prefix, "")
    let commandAndParamters
    if(commandString.charAt(0) === " ") {
        commandAndParamters = commandString.split(" ").slice(1)
    } else {
        commandAndParamters = commandString.split(" ").slice(0)
    }
    return commandAndParamters
}

export function getAllowedChannels(){
    allowedChannelsArray = allowedChannels
    let allowedChannelsArray = allowedChannelsArray.split(" ")
    return allowedChannelsArray
    
}

export function stringifyParamters(paramtersArray){
    return paramtersArray.reduce((previous, next)=>{
        previous += ` ${next}`
        return previous
    }, "")
}

export function isValidUrl(string) {
    try {
      new URL(string)
    } catch (_) {
      return false; 
    }
  
    return true
}