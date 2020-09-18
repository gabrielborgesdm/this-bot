const commands = require("../Commands")

export function help(message, command) {
    let content = ""

    commands.forEach((command, index)=>{
        content += `${index + 1}.\` ${prefix} ${command.command}\`:  ${command.description}  \n`
    })
    message.channel.send(content)
}