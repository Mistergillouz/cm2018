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
            sortIndex: 0,
            sortAscending: true,
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

        return (
            <div className="cmResultRanking">
                <table className="cmRankingTable" cellSpacing="0">
                    <thead>
                        <tr>
                            { this.columns.map((column, index) => <th onClick={ () => this.onSort(index) }>{ column.text }</th>) }
                        </tr>
                    </thead>
                    <tbody>
                        { this.genrateResultsRows(users) }
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

    genrateResultsRows(users) {

        const keys = this._sort(users, this.state.sortIndex, this.state.sortAscending)
        const ranking = this._sort(users, 3, false)

        return keys.map((key, userIndex) => {
            return (
                <tr onClick={ () => this.onShowUserBets(key) }>
                    { this.columns.map((column, index) => {
                        let value =  this._getColumnValue(users, key, index)
                        if (column.id === 'score' && value < 0) {
                            value = 'n/a'
                        } else if (column.id === 'rank') {
                            value = value < 0 ? 'n/a' : ranking.indexOf(key) + 1
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

    _sort(users, sortIndex, ascending) {
        return Object.keys(users).sort((a, b) => {
            const va = this._getColumnValue(users, a, sortIndex)
            const vb = this._getColumnValue(users, b, sortIndex)
            const diff = this.columns[sortIndex].type === 'string' ? va.localeCompare(vb) : va - vb
            return ascending ? diff : -diff
        })
    }

    _getColumnValue(users, key, columnIndex) {
        const user = users[key]
        switch (columnIndex) {
            case 0: return key
            case 1: return user.completed
            default: return user.completed ? user.score : -1
        }
    }
    generateUserBets () {
        if (!this.state.users) {
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
                <div className='cmRankingHeader'>{ 'Paris de ' + this.state.currentUser }</div>
                <FinaleGroups finales={ bets } bets={ results } readOnly={ true }/>
            </div>
        )
    }
    
    onShowUserBets (user) {
        this.setState({ currentUser: user })
    }

}



