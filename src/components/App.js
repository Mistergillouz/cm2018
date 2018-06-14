import React from 'react'

import GameHelper from '../data/GameHelper'
import Constants from '../data/Constants'
import TopBanner from './TopBanner'
import LoginPage from './LoginPage'
import BetPage from './BetPage'
import ResultsPage from './ResultsPage'
import StatsPage from './StatsPage'

import '../../assets/css/app.scss'

export default class App extends React.Component {

    constructor (props) {
        super(props)

        const isLogged = GameHelper.isLogged()
        this.state = { 
            isLogged
        }

        this.state.page = this.getDefaultPage()
    }

    render () {
        return (
            <div>
                <TopBanner 
                    userName={ GameHelper.getUserName() } 
                    activePage={ this.state.page }
                    onShowPage={ page => this.setState({ page })}
                />

                { this.renderPage() }
            </div>
        )
    }

    renderPage () {

        switch (this.state.page || this.getDefaultPage()) {

            case Constants.PAGES.LOGIN:
                return <LoginPage 
                    userName={ GameHelper.getUserName() } 
                    onLogin={ (userName) => this.onLogin(userName) }
                />

            case Constants.PAGES.BETS:
                return <BetPage/>
            
            case Constants.PAGES.RESULTS:
                return <ResultsPage/>

            case Constants.PAGES.STATS:
                return <StatsPage/>
            
            default:
                return null
        }
    }

    onLogin (userName) {
        GameHelper.logon(userName)
            .then(result => this.setState({ isLogged: true, page: this.getDefaultPage() }))
            .catch(() => alert('Invalid user \'' + userName + '\''))
    }

    getDefaultPage () {
        if (!this.state.isLogged) {
            return Constants.PAGES.LOGIN
        }
        
        return GameHelper.isSubmitAllowed() ? Constants.PAGES.BETS : Constants.PAGES.RESULTS
    }
}


    