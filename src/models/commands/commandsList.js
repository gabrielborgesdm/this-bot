import { getAGif, hug, kick, nuts } from "./Picture"
import help from "./Help"
import { playYoutube, stopYoutube, changeVolume, pauseYoutube, resumeYoutube, count } from "./Play"

export default [
    {
        "command": "help",
        "description": "List all the commands availables",
        "method": help
    },

    {
        "command": "count",
        "description": "start counting from 3 to 1",
        "method": count
    },
    {
        "command": "play",
        "params": "[url: youtube url]",
        "description": "it plays a youtube url",
        "method": playYoutube
    },
    
    {
        "command": "volume",
        "params": "[volume: between 0 and 1]",
        "description": "Changes the Bot's music Volume",
        "method": changeVolume
    },

    {
        "command": "pause",
        "description": "it pauses the current song",
        "method": pauseYoutube
    },

    {
        "command": "resume",
        "description": "it resumes the current song",
        "method": resumeYoutube
    },
    
    {
        "command": "stop",
        "description": "Stops playing music",
        "method": stopYoutube
    },

    {
        "command": "gif",
        "params": "[term1] [term2] [...]",
        "description": "Give a random gif according to search terms",
        "method": getAGif
    },

    {
        "command": "nuts",
        "params": "[@person_nickname]",
        "description": "nuts",
        "method": nuts
    },

    {
        "command": "kick",
        "params": "[@person_nickname]",
        "description": "kicks someone",
        "method": kick
    },
    
    {
        "command": "hug",
        "params": "[@person_nickname]",
        "description": "hugs someone",
        "method": hug
    }, 
]