import React from 'react'

import TopBanner from './TopBanner'
import LoginPage from './LoginPage'
import MainPage from './MainPage'
import GameHelper from '../data/GameHelper'


import '../../assets/css/app.css'

export default class App extends React.Component {

    constructor (props) {
        super(props)

        this.state = { 
            isLogged: false, 
            showLoginPage: false
        }
    }

    render () {
        return (
            <div>
                <TopBanner 
                    userName={ GameHelper.getUserName() } 
                    onEnterUserName={ () => this.setState({ showLoginPage: true })}/>

                { this.renderState() }
            </div>
        )
    }

    renderState () {

        if (this.state.showLoginPage || (!this.state.isLogged && !this.props.isLogged)) {
            return <LoginPage 
                userName={ GameHelper.getUserName() } 
                onLogin={ (userName) => this.onLogin(userName) }
            />
        }

        return <MainPage/>
    }

    onLogin (userName) {
        GameHelper.logon(userName)
            .then(result => this.setState({ showLoginPage: false, isLogged: true }))
            .catch(() => alert('Invalid user \"' + userName + '\"'))
    }
}
