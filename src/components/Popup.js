import React from 'react'

import '../../assets/css/Popup.scss'

export default class Popup extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render () {
        return (
            <div className="cmPopup" onClick={ () => this.onClick() }>
                <span ref="popup" className="cmPopupText">TEXTTTTTTTTTTTTTTTTTTTTTTTT</span>
            </div>
        )
    }

    show () {
        // this.refs.popup.classList.toggle('show')
    }
}
