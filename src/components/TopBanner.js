import React from 'react'
import GameHelper from '../data/GameHelper'

import '../../assets/css/TopBanner.scss'
import Constants from '../data/Constants';

export default class TopBanner extends React.Component {

    render () {
        const userNameText = this.props.userName ?  this.props.userName : 'Not logged'
        const buttons = [
            { text: 'MES VOTES', page: Constants.PAGES.BETS },
            { text: 'RESULTATS', page: Constants.PAGES.RESULTS },
            { text: 'STATS', page: Constants.PAGES.STATS }
        ]
        return (
            <div className='cmTopBanner'>
                <span className='cmTopBannerTitle'>Coupe du monde 2018</span>
                <div className='cmUserInfo'  onClick={ (e) => this.onShowPage(Constants.PAGES.LOGIN) }>
                    <i className='far fa-user cmLoginIcon'></i>
                    <span className='cmUserName'>{ userNameText }</span>
                </div>
                <div className="cmResultMenu">
                    { buttons.map(button => <span onClick={ () => this.onShowPage(button.page) }>{ this._eye(button.page) }{ button.text }</span>) }
                </div>
            </div>
        )
    }

    _eye(page) {
        return page === this.props.activePage ? <i className="far fa-eye"></i> : null
    }

    onShowPage (page) {
        this.props.onShowPage(page)
    }
}
