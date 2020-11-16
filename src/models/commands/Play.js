import ytdl from 'ytdl-core-discord'
import {getVolume, updateVolume} from "../database/PlayDatabase"
import { stringifyParamters } from "../Validation"
import { isValidUrl } from "../Validation"
import fs from "fs"

var dispatcher = false

let youtube_search_api_url=process.env.youtube_api_key

export async function playYoutube({ message, commandAndParamters}) {
    let urlOrSearchString = stringifyParamters(commandAndParamters.slice([1])) 

    if(!urlOrSearchString || !isValidUrl(urlOrSearchString)){
        message.channel.send("URL must be valid")
        return
    } else if (!message.member.voice.channel) {
        message.channel.send("It wasn't possible to connect to Voice Chat")
        return
    }
    
    let volume = await getVolume()
    let connection = await joinRoom(message)

     if(!connection){
        message.channel.send("It wasn't possible to join the room, verify the roles")
        return
    }
    let url = urlOrSearchString
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

export async function count({ message }){
    let volume = await getVolume()
    let connection = await joinRoom(message)

    if(!connection){
        message.channel.send("It wasn't possible to join the room, verify the roles")
        return
    }
    try {
        dispatcher = connection.play(fs.createReadStream('src/public/audio/counter.wav'), {volume: volume})
        
        dispatcher.on('start', () => {
            let count = 3
            let interval = setInterval(async() => {
                if(count === 0){
                    clearInterval(interval)
                    message.channel.send("GO")
                } else {
                    message.channel.send(count)
                    count--
                }
            }, 1000);
        })
        
        
        dispatcher.on('error', (error)=>{
            console.log(error)
            message.channel.send("An error ocurred with the bot song")
            return
        })
    } catch (error) {
        console.log(error)
        message.channel.send("It wasn't possible to play this song", url)
    }
}

async function joinRoom(message){
    let connection = false
    try {
        connection = await message.member.voice.channel.join()
        
    } catch (error) {
        console.log('asdasd')
    }
    return connection
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
