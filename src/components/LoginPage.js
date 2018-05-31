import React from 'react'
import '../../assets/css/LoginPage.css'
export default class LoginPage extends React.Component {

    render () {
        return (
            <div className='cmLoginPage'>
                <h2>Enter user name</h2>
                <div>
                    <input className='cmInput' type='text' ref='userName' placeholder='Username' defaultValue={ this.props.userName }/>
                </div>
                <button className='cmButton cmLoginButton' onClick={ (e) => this.onLogin() }>Login</button>
            </div>
        )
    }

    onLogin () {
        this.props.onLogin(this.refs.userName.value)
    }
}



