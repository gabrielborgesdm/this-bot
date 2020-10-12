import ytdl from "ytdl-core"
import {getVolume} from "../database/PlayDatabase"

export async function playYoutube({client, message}) {
    if (message.member.voice.channel) {
        let volume = await getVolume()
        console.log("bodfdf", volume)
        const connection = await message.member.voice.channel.join()
        connection.play(ytdl('https://www.youtube.com/watch?v=RBumgq5yVrA', { quality: 'highestaudio', volume: volume })) 
        console.log(volume)
        message.channel.send("Song will be played")
    }
    
}

export async function stopYoutube({client, message}) {
    if (message.member.voice.channel) {
        const connection = await message.member.voice.channel.join()
        connection.disconnect() 
        message.channel.send("Song stopped")
    }
    
}
