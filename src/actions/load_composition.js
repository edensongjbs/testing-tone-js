import { loadInstrument } from './instrument'
import { establishTransportSettings } from '../lib/establish_transport_settings'
import { baseUrl } from '../settings/global_settings'

export const loadComposition = (compositionId) => {
    const url = `${baseUrl}compositions/${compositionId}`
    return (dispatch) => {
        dispatch({type:'START_LOADING_COMPOSITION'})
        fetch(url, {headers:{'Authorization': `Bearer ${localStorage.jwt}`}})
        .then(res => res.json())
        .then(json => {
            
            establishTransportSettings(json.origTempo, json.timeSigNum, json.timeSigDenom, json.numBars)
            if (json.message || json.error) {
               
                window.history.pushState({pathname:`/`}, "", `/`)
                window.location.reload()
                return
            }
            dispatch({type:'LOGIN', user:{userName:json.userName, jwt: localStorage.jwt}})
            json.layers.forEach(layer => {
                dispatch(loadInstrument(layer.instrumentName, layer.id))
                dispatch({type:'CREATE_LAYER', layer: JSON.parse(layer.layerString), userName: layer.userName, layerId: layer.id, layerName: layer.layerName, readOnly: layer.readOnly})
            })
            json.users.forEach(user => {
                dispatch({type:'ADD_USER', user:{...user, loggedIn:false}})
            })
            dispatch({type:'FINISH_LOADING_COMPOSITION', composition:json})
            dispatch({type:'FINISH_LOADING'})}).catch((json)=>{
                
                window.history.pushState({pathname:`/`}, "", `/`)
                window.location.reload()
            })
    }
}