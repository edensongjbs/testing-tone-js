export default (state = {current:{loaded:false}}, action) => {
    let theInstrument
    switch (action.type) {
        case 'START_LOADING_INSTRUMENT':
            return {...state, [action.layerId]:{name: action.instrumentName, instrumentObject: action.instrumentObject, loaded: false}}
        case 'FINISH_LOADING_INSTRUMENT':
            theInstrument = state[action.layerId]
            theInstrument.loaded = true
            theInstrument.instrumentObject.toDestination()
            return {...state, [action.layerId]:theInstrument}
        case 'CURRENT_INSTRUMENT_TO_NEW_LAYER':
            theInstrument = {...state.current}
            return {...state, [action.layerId]:theInstrument}
        case 'REMOVE_INSTRUMENT': //should be invoked when a layer is deleted
            delete state[action.layerId]
            return state
        default:
            return state
    }
}