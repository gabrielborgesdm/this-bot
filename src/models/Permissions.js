import { getAllowedChannels } from "./Validation"

const prefix = process.env.prefix

export function checkIsBot(message) {
    return message.author.bot
}

export function checkHasntPrefix(message) {
    return message.content.startsWith(prefix) ? false : true
}

export function checkIsntAllowed(message) {
    let allowedChannelsArray = getAllowedChannels()
    let channel = message.channel.id
    return allowedChannelsArray.indexOf(channel) === -1 ? true : false
}

export function checkShouldStop(message){
    let check = false
    if(checkIsBot(message) || checkHasntPrefix(message) || checkIsntAllowed(message)){
        check = true
    }
    return check 
}