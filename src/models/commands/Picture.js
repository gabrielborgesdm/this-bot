import api from "../../services/Api"

const giphy_api = process.env.giphy_api

export default function getAGif({message, commandAndParamters}) {
    
    message.channel.send(commandAndParamters)
}
