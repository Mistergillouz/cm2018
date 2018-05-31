import React from 'react'
import TeamGroup from './TeamGroup'
import GameHelper from '../data/GameHelper'
import Constants from '../data/Constants'

import '../../assets/css/FinaleGroups.css'

export default class FinaleGroups extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            groups: this.props.finales
        }
    }
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
                    teams={ this.state.groups[group.key] } 
                    selection={ GameHelper.getBet(group) } 
                    onSelectionChanged={ selection => this.onTeamClicked(group, selection) }/>) 
                }
            </div>
        )
    }

    onTeamClicked (group, selection) {
        GameHelper.setBet(group, selection)
        this.setState({ groups: GameHelper.getFinaleGroups() })
    }
}
