import React from 'react'
import GameHelper from '../data/GameHelper'
import Constants from '../data/Constants'
import FinaleGroups from './FinaleGroups'

import '../../assets/css/ResultsPage.scss'

export default class ResultsPage extends React.Component {

    constructor (props) {
        super(props)

        this.columns = [
            { text: 'Nom', id: 'name', type: 'string' },
            { text: 'Vote', id: 'vote', type: 'boolean' },
            { text: 'Points', type: 'Numeric', id: 'score' },
            { text: 'Rank', type: 'Numeric', id: 'rank' }
        ]

        this.state = {
            sortIndex: ResultsPage.SCORE_COL_INDEX,
            sortAscending: false,
            results: null,
            currentUser: GameHelper.getUserName()
        }

        GameHelper.loadResults().then(requestData => this.setState({ 
            users: requestData.data.users,
            results: requestData.data.results || {}
        }))
    }

    render () {
        return (
            <div className='cmResultsPage'>
                <div className='cmRankingTableContainer'>
                    <div className='cmRankingHeader'>RESULTATS</div>
                    { this.generateRankingTable() }
                </div>
                { this.generateUserBets() }
            </div>
        )
    }

    generateRankingTable (users) {
        if (!this.state.users) {
            return null
        }

        return (
            <div className="cmResultRanking">
                <table className="cmRankingTable" cellSpacing="0">
                    <thead>
                        <tr>
                            { this.columns.map((column, index) => <th onClick={ () => this.onSort(index) }>{ column.text }</th>) }
                        </tr>
                    </thead>
                    <tbody>
                        { this.genrateResultsRows() }
                    </tbody>
                </table>
            </div>
        )
    }

    onSort(index) {
        if (index === this.state.sortIndex) {
            this.setState({ sortAscending: !this.state.sortAscending })
        } else {
            this.setState({ sortAscending: false, sortIndex: index })
        }
    }

    genrateResultsRows() {

        const ranking = this.getRanking()
        const keys = this._sort(this.state.sortIndex, this.state.sortAscending)
        return keys.map(key => {
            return (
                <tr onClick={ () => this.onShowUserBets(key) }>
                    { this.columns.map((column, index) => {
                        let value =  this._getColumnValue(key, index)
                        if (column.id === 'score' && value < 0) {
                            value = 'n/a'
                        } else if (column.id === 'rank') {
                            value = value < 0 ? 'n/a' : ranking[key]
                        } else if (column.id === 'vote') {
                            value = value ? 'Yes' : 'No'
                        }

                        return <td>{ value }</td>
                    })}
                </tr>
                )
            }
        )
    }

    getRanking() {
        const ranking = {}
        let rank = 0, previous = -1
        const scores = this._sort(ResultsPage.SCORE_COL_INDEX, false)
        scores.forEach(user => {
            const current = this._getColumnValue(user, ResultsPage.SCORE_COL_INDEX)
            if (previous !== current) {
                previous = current
                rank++
            }

            ranking[user] = rank
        })

        return ranking
    }

    _sort(sortIndex, ascending) {
        return Object.keys(this.state.users).sort((a, b) => {
            const va = this._getColumnValue(a, sortIndex)
            const vb = this._getColumnValue(b, sortIndex)
            const diff = this.columns[sortIndex].type === 'string' ? va.localeCompare(vb) : va - vb
            return ascending ? diff : -diff
        })
    }

    _getColumnValue(userId, columnIndex) {
        const user = this.state.users[userId]
        switch (columnIndex) {
            case 0: return userId
            case 1: return user.completed
            default: return user.completed ? user.score : -1
        }
    }
    generateUserBets () {
        if (!this.state.users) {
            return null
        }

        const userBets = this.state.users[this.state.currentUser].bets || {}
        const keys = Object.keys(Constants.PHASES), bets = {}, results = {}
        for (let i = 0; i < keys.length - 1; i++) {
            bets[keys[i + 1]] = userBets[keys[i]] || []
            results[keys[i + 1]] = this.state.results[keys[i]]
        }

        return (
            <div className="cmRankingTableContainer">
                <div className='cmRankingHeader'>{ 'Paris de ' + this.state.currentUser }</div>
                <FinaleGroups finales={ bets } bets={ results } readOnly={ true }/>
            </div>
        )
    }
    
    onShowUserBets (user) {
        this.setState({ currentUser: user })
    }

}

ResultsPage.SCORE_COL_INDEX = 2