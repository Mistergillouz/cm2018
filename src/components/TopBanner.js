import React from 'react'
import GameHelper from '../data/GameHelper'
import '../../assets/css/TopBanner.css'

export default class TopBanner extends React.Component {

    render () {
        const userNameText = GameHelper.getUserName() ?  GameHelper.getUserName() : 'Not logged'
        return (
            <div className="cmTopBanner">
                <span className="cmTopBannerTitle">Coupe du monde 2018</span>
                <div className="cmUserInfo">
                    <i className="fas fa-sign-in-alt cmLoginIcon" onClick={ (e) => this.onLogin() }></i>
                    <span className="cmUserName">{ userNameText }</span>
                </div>
            </div>
        )
    }

    onLogin () {
        console.log('onlogin')
    }

}
