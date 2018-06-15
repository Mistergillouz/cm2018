import React from 'react'
import TeamGroup from './TeamGroup'
import GameHelper from '../data/GameHelper'
import Constants from '../data/Constants'

import '../../assets/css/FinaleGroups.css'

export default class FinaleGroups extends React.Component {

    render () {

        const groups = [
            Constants.PHASES.HUITIEME,
            Constants.PHASES.QUART,
            Constants.PHASES.DEMI,
            Constants.PHASES.FINALE
        ]

        if (this.props.readOnly) {
            groups.push(Constants.PHASES.WINNER)
        }

        return (
            <div className='cmFinales'>
                { groups.map(group => <TeamGroup title={ group.title } 
                    selectionCount={ group.selectionCount }
                    teams={ this.props.finales[group.key] } 
                    selection={ this.props.bets[group.key] } 
                    readOnly={ this.props.readOnly }
                    onSelectionChanged={ selection => this.onTeamClicked(group, selection) }/>) 
                }
            </div>
        )
    }

    onTeamClicked (finale, selection) {
        if (this.props.onFinaleSelectionChanged) {
            this.props.onFinaleSelectionChanged(finale, selection)
        }
    }
}
