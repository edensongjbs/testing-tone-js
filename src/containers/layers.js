import {connect} from 'react-redux'
import React from 'react'
import Layer from '../components/Layer'

const Layers = (props) => {
    return(
        <ul>
            {props.layers.map( layer => {
                return <Layer key={layer.id} layer={layer} instrument={props.instruments[layer.id]}/>
            })}
        </ul>
    )
}

const mapStateToProps = (state) => ({
    layers: state.layers,
    instruments: state.instruments
})

export default connect(mapStateToProps)(Layers)