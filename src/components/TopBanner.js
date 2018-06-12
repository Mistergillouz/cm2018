import React from 'react'
import GameHelper from '../data/GameHelper'

import '../../assets/css/TopBanner.scss'

export default class TopBanner extends React.Component {

    render () {
        const userNameText = this.props.userName ?  this.props.userName : 'Not logged'
        return (
            <div className='cmTopBanner'>
                <span className='cmTopBannerTitle'>Coupe du monde 2018</span>
                <div className='cmUserInfo'  onClick={ (e) => this.onLogin() }>
                    <i className='far fa-user cmLoginIcon'></i>
                    <span className='cmUserName'>{ userNameText }</span>
                </div>
                <div className="cmResultMenu">
                    <span onClick={ (e) => this.onShowResult() }>RESULTATS</span>
                    {/* <span onClick={ (e) => this.onShowStat() }>STATS</span> */}
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

    onShowStat () {
        this.props.onShowStat()
    }
}
