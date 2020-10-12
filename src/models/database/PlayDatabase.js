import PouchDB from 'pouchdb'

const playDB = new PouchDB('play')

const settings = {
    _id: "settings",
    volume: 0.2
}

export async function getVolume(){
    let volume = settings.volume
    let response = await getPlaySettings()
    if(response && response.volume){
        console.log("volume", response.volume)
        volume =  response.volume
    }
    return volume
}

async function getPlaySettings(){
    let response = await playDB.get('settings').then(function (result) {
        return result
    }).catch(function (err) {
        console.log(err)
        return false
    })

    if(!response) {
        response = settings
        console.log("alo")
        await createPlaySettings(settings)
    }

    return response
}

async function createPlaySettings(settings){
    let response = await playDB.put(settings).then(function (result) {
        return result.ok ? true : false
    }).catch(function (err) {
        return false
    })

    return response
}

export async function updateVolume(text) {
    var todo = {
      _id: new Date().toISOString(),
      title: text,
      completed: false
    }
    db.put(todo, function callback(err, result) {
      if (!err) {
        console.log('Successfully posted a todo!')
      }
    })
}