import help from "./commands/Help"
import { getAGif, kiss, hug } from "./commands/Picture"
import { getArticle } from "./commands/Wikipedia"
import translate from "./commands/Translate"

const prefix = process.env.prefix

export const commands = [
    {
        command: "help",
        description: "List all the commands availables",
        method: help
    },
    {
        command: "gif",
        params: "[term1] [term2] [...]",
        description: "Give a random gif according to search terms",
        method: getAGif
    },


    {
        command: "kiss",
        params: "[@person_nickname]",
        description: "Kisses someone <3",
        method: kiss
    },
    
    {
        command: "hug",
        params: "[@person_nickname]",
        description: "hugs someone <3",
        method: hug
    },
]


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