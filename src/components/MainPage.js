import React from 'react'
import GameHelper from '../data/GameHelper'
import Poules from './Poules'
import Finales from './Finales'

export default class MainPage extends React.Component {

    render () {
        return (
            <div>
                <Poules/>
                <Finales/>
            </div>
        )
    }
}
