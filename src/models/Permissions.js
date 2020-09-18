const prefix = process.env.prefix

export function checkIsBot(message) {
    return message.author.bot
}

export function checkPrefix(message) {
    return message.content.startsWith(prefix)
}