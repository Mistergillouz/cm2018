import React from 'react'
import GameHelper from '../data/GameHelper'
import Constants from '../data/Constants'
import TeamGroup from './TeamGroup'

import '../../assets/css/Poules.css'

export default class Poules extends React.Component {

    constructor (props) {
        super (props)

        this.bets = this.props.bets
    }

    render () {
        const submitVisible = this.props.submitVisible
        return (
            <div className='cmPoules'>
                { this.generateGroups() }
            </div>
        )
    }

    onSelectedTeamsChanged (groupKey, selection) {
        this.bets[groupKey] = selection

        let bets = []
        Object.keys(this.bets).forEach(key => bets = bets.concat(this.bets[key]))
        this.props.onGroupSelectionChanged(bets)
    }
    
    generateGroups () {
        return (<div className='cmPouleGroups'>{ GameHelper.getGroups().map(key => this.generatePouleGroup(key)) }</div>)
    }
    
    generatePouleGroup (key) {
        const poule = GameHelper.getGroup(key), selection = this.bets[key]
        return <TeamGroup 
            title={ 'GROUPE ' + key }
            selectionCount={ 2 }
            teams={ poule } 
            selection={ selection }
            onSelectionChanged={ selection => this.onSelectedTeamsChanged(key, selection) }
        />
    }


}
