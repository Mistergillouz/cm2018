import React from 'react'
import GameHelper from '../data/GameHelper'

import '../../assets/css/TopBanner.scss'
import Constants from '../data/Constants';

export default class TopBanner extends React.Component {

    render () {
        const userName = this.props.userName ?  this.props.userName : 'Not logged'
        const buttons = [
            { text: 'MES VOTES', page: Constants.PAGES.BETS },
            { text: 'RESULTATS', page: Constants.PAGES.RESULTS },
            { text: 'STATS', page: Constants.PAGES.STATS }
        ]

        // Po po po!
        if (['Gillouz', 'ColClark'].indexOf(userName) !== -1) {
            buttons.push({ text: 'ADMIN', page: Constants.PAGES.ENTER_RESULTS })
        }
        
        return (
            <div className='cmTopBanner'>
                <div className="cmResultMenu" ref="cmResultMenu">
                    <a href="javascript:void(0);" class="cmSandwitch" onClick={ () => this.onTogglePopupMenu() }>
                        <i class="fas fa-bars"></i>
                    </a>
                    { buttons.map(button => <a className={ button.page === this.props.activePage ? 'active' : '' } onClick={ () => this.onShowPage(button.page) }>{ button.text }</a>) }
                </div>
                <div className='cmUserInfo'  onClick={ (e) => this.onShowPage(Constants.PAGES.LOGIN) }>
                    <i className='far fa-user cmLoginIcon'></i>
                    <span className='cmUserName'>{ userName }</span>
                </div>
                
            </div>
        )
    }

    onTogglePopupMenu() {
        const item = this.refs.cmResultMenu
        item.classList.toggle('responsive')
    }

    onShowPage (page) {
        this.refs.cmResultMenu.classList.remove('responsive')
        this.props.onShowPage(page)
    }
}
