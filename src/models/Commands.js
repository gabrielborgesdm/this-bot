import help from "./commands/Help"
import { getAGif, kiss, hug } from "./commands/Picture"
import { playYoutube, stopYoutube, changeVolume, pauseYoutube, resumeYoutube } from "./commands/Play"

export const commands = [
    {
        command: "help",
        description: "List all the commands availables",
        method: help
    },

    {
        command: "play",
        params: "[url: youtube url]",
        description: "it plays a youtube url",
        method: playYoutube
    },
    
    {
        command: "volume",
        params: "[volume: between 0 and 1]",
        description: "Changes the Bot's music Volume",
        method: changeVolume
    },

    {
        command: "pause",
        description: "it pauses the current song",
        method: pauseYoutube
    },

    {
        command: "resume",
        description: "it resumes the current song",
        method: resumeYoutube
    },
    
    {
        command: "stop",
        description: "Stops playing music",
        method: stopYoutube
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
    console.log(command)
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