import ytdl from 'ytdl-core-discord'
import {getVolume, updateVolume} from "../database/PlayDatabase"
import { isValidUrl } from "../Validation"

var dispatcher = false

export async function playYoutube({client, message, commandAndParamters}) {
    let url = commandAndParamters[1]

    if(!url || !isValidUrl(url)){
        message.channel.send("URL must be valid")
        return
    } else if (!message.member.voice.channel) {
        message.channel.send("It wasn't possible to connect to Voice Chat")
        return
    }
    
    let volume = await getVolume()
    const connection = await message.member.voice.channel.join()
    try {
        dispatcher = connection.play(await ytdl(url), { type: 'opus', volume })
        
        dispatcher.on('start', () => {
            console.log('Your song is now playing!')
        })
        
        dispatcher.on('finish', () => {
            console.log('Your song has finished playing!') 
        })
        
        dispatcher.on('error', ()=>{
            console.log(error)
            message.channel.send("An error ocurred with the bot song")
            return
        })
    } catch (error) {
        console.log(error)
        message.channel.send("It wasn't possible to play this song", url)
    }
}

export async function changeVolume({message, commandAndParamters}){
    let volume = parseFloat(commandAndParamters[1])
    if(isNaN(volume) || volume < 0 || volume > 1){
        message.channel.send("Volume must be between 0 and 1")
        return
    }
    
    let volumeUpdated = await updateVolume(volume)
    if(!volumeUpdated){
        message.channel.send("Sorry, an error ocurred, try again later")
        return
    }

    if(dispatcher) dispatcher.setVolume(volume)
    message.channel.send(`Volume updated to ${volume}`)
}

export async function pauseYoutube({message}){

    if(!dispatcher) {
        message.channel.send("No song is being played to be paused")
        return
    }
    dispatcher.pause()
    message.channel.send(`Song has been paused`)
}

export async function resumeYoutube({message}){

    if(!dispatcher) {
        message.channel.send("No song is being played to be resumed")
        return
    }
    dispatcher.resume()
    message.channel.send(`Song has been resumed`)
}

export async function stopYoutube({client, message}) {
    if(dispatcher) {
        dispatcher.destroy()
        dispatcher = false
    }
    if (message.member.voice.channel) {
        const connection = await message.member.voice.channel.join()
        connection.disconnect() 
        message.channel.send("Song stopped")
    }
    
}
