import React from 'react'
import GameHelper from '../data/GameHelper'

import '../../assets/css/TopBanner.css'

export default class TopBanner extends React.Component {

    render () {
        const userNameText = this.props.userName ?  this.props.userName : 'Not logged'
        return (
            <div className='cmTopBanner'>
                <span className='cmTopBannerTitle'>Coupe du monde 2018</span>
                <div className='cmUserInfo'>
                    <i className='far fa-user cmLoginIcon' onClick={ (e) => this.onLogin() }></i>
                    <span className='cmUserName'>{ userNameText }</span>
                </div>
                <div className="cmResultIcon" onClick={ (e) => this.onShowResult() }>
                    <span>TEST</span>
                </div>
            </div>
        )
    }

    onLogin () {
        this.props.onEnterUserName()
    }

    onShowResult () {
        this.props.onShowResults()
    }

}
