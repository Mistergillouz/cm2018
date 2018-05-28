import React from 'react'
import Poules from './poules'
import '../../assets/css/app.css'

export default class App extends React.Component {

    render () {
        return (
            <div className='image'>
            <label>Hello { this.props.message } </label>
            <Poules/>
            </div>
        )
    }

    toto (/*str: string */) {
    }
}
