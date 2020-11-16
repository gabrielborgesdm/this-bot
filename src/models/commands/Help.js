import commands from "./commandsList"

const prefix = process.env.prefix

export default function help({message}) {
    let content = `**Help Commands** \n`

    commands.forEach((command, index)=>{
        content += `${index + 1}. \`${prefix}${command.command}\`${command.params ? "*" + command.params + "*" : "" } :  ${command.description}  \n`
    })
    message.channel.send(content)
}