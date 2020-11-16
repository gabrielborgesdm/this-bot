import Discord from 'discord.js'
import { stringifyParamters } from "../Validation"
import api from "../../services/Api"

const giphy_api_key = process.env.giphy_api_key
const giphy_api_url = process.env.giphy_api_url
var lastGifURL = ""


export async function getAGif({message, commandAndParamters}) {
    let searchString = stringifyParamters(commandAndParamters.slice([1]))
    let gif = await getRandomSearchedGif(searchString)
    message.channel.send(gif || "Ops, GIF not found :(")
}

async function getRandomSearchedGif(searchString){
    let gifs = await searchGifs(searchString)
    let gif = null
    if(gifs && gifs.length){
        do{
            let random = Math.floor((Math.random() * gifs.length) + 1)
            gif = gifs[random].url
        } while(gif === lastGifURL)
        lastGifURL = gif 
    }
    return gif
}

async function searchGifs(searchString){
    let gifs = null
    try {
        let url = `http://${giphy_api_url}?api_key=${giphy_api_key}&q=${encodeURIComponent(searchString)}`
        let response = await api.get(url) 
        if(response && response.data && response.data.data){
            gifs = response.data.data
        }
    } catch (error) {
        console.log(error)
    }
    return gifs
}

async function executeGifAction(message, searchTerms, actionVerb){
    let users = message.mentions.users
    if(users.size > 0){
        for (var [key, value] of users) {
            let gif = await getRandomSearchedGif(searchTerms)
            message.channel.send(`<@${message.author.id}> ${actionVerb} <@${value.id}>`)
            message.channel.send(gif)
          }
    } else {
        message.channel.send(`This person doesn't exist you weirdo :(`)
    }
}

export function kick({message}) {
    executeGifAction(message, "kick in nuts", "kicked in the nuts")   
}

export function hug({message}) {
    executeGifAction(message, "hug", "hugged")   
}

export function nuts({message}) {
    executeGifAction(message, "kick", "kicked")   
}
