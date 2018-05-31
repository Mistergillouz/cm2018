import React from 'react'
import TeamGroup from './TeamGroup'
import GameHelper from '../data/GameHelper'
import Constants from '../data/Constants'

import '../../assets/css/FinaleGroups.css'

export default class FinaleGroups extends React.Component {

    render () {

        const groups = [
            Constants.BETS.HUITIEME,
            Constants.BETS.QUART,
            Constants.BETS.DEMI,
            Constants.BETS.FINALE
        ]

        return (
            <div className='cmFinales'>
                { groups.map(group => <TeamGroup title={ group.title } 
                    selectionCount={ group.selectionCount }
                    teams={ this.props.finales[group.key] } 
                    selection={ GameHelper.getBet(group) } 
                    onSelectionChanged={ selection => this.onTeamClicked(group, selection) }/>) 
                }
            </div>
        )
    }

    onTeamClicked (finale, selection) {
        this.props.onFinaleSelectionChanged(finale, selection)
    }
}
