import PouchDB from 'pouchdb'

const playDB = new PouchDB('play')

const settings = {
    _id: "settings",
    volume: 0.1
}

export async function getVolume(){
    let volume = settings.volume
    let response = await getPlaySettings()
    if(response && response.volume){
        volume =  response.volume
    }
    return volume
}

export async function updateVolume(volume) {
    settings.volume = volume
    let checkSuccess = await updatePlaySettings(settings)
    
    return checkSuccess ? true : false
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

async function updatePlaySettings(newSettings){
    let status = false
    await playDB.get('settings').then(function(doc) {
        return playDB.put({
            ...newSettings,
            _rev: doc._rev,
        })
    }).then(function(response) {
        status = response
    }).catch(function (err) {
        console.log(err)
    })
    if(!status){
        status = await createPlaySettings({...settings, ...newSettings})
    }
    return status
}