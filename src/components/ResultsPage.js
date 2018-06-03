import React from 'react'
import GameHelper from '../data/GameHelper'
import Constants from '../data/Constants'
import FinaleGroups from './FinaleGroups'

import '../../assets/css/ResultsPage.css'

export default class ResultsPage extends React.Component {

    constructor (props) {
        super(props)

        this.state = {
            results: null,
            currentUser: GameHelper.getUserName()
        }

        GameHelper.loadResults().then(requestData => this.setState({ 
            users: requestData.data.users,
            results: requestData.data.results
        }))
    }

    render () {
        return (
            <div className='cmResultsPage'>
                <div className='cmRankingTableContainer'>
                    <div className='cmRankingHeader'>RESULTATS</div>
                    { this.generateRankingTable(this.state.users) }
                </div>
                { this.generateUserBets() }
            </div>
        )
    }

    generateRankingTable (users) {
        if (!users) {
            return null
        }

        const keys = Object.keys(users).sort((a, b) => users[b].score - users[a].score)
        return (
            
            <div className="cmResultRanking">
                <table className="cmRankingTable" cellSpacing="0">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Points</th>
                            <th>Rank</th>
                        </tr>
                    </thead>
                    <tbody>
                        { keys.map((key, index) => {
                            let user = users[key], score = user.score < 0 ? 'n/a' : user.score, rank = user.score < 0 ? 'n/a' : index + 1
                            return (<tr onClick={ () => this.onShowUserBets(key) }><td>{ key }</td><td>{ score }</td><td>{ rank }</td></tr>)
                        })}
                    </tbody>
                </table>
            </div>
        )
    }

    generateUserBets () {
        if (!this.state.currentUser || !this.state.results) {
            return null
        }

        const userBets = this.state.users[this.state.currentUser].bets || {}
        const keys = Object.keys(Constants.BETS), bets = {}, results = {}
        for (let i = 0; i < keys.length - 1; i++) {
            bets[keys[i + 1]] = userBets[keys[i]] || []
            results[keys[i + 1]] = this.state.results[keys[i]]
        }

        return (
            <div className="cmRankingTableContainer">
                <div className='cmRankingHeader'>{ 'Paris correct de ' + this.state.currentUser }</div>
                <FinaleGroups finales={ bets } bets={ results } readOnly={ true }/>
            </div>
        )
    }
    onShowUserBets (user) {
        this.setState({ currentUser: user })
    }

}



