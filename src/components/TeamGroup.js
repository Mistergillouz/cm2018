import React from 'react'
import Team from './Team'
import '../../assets/css/TeamGroup.css'

export default class TeamGroup extends React.Component {

    render () {
        return (
            <div className="cmTeamGroup">
                <div className="cmTeamGroupTitle">{ this.props.title }</div>
                { this.props.teams.map(id => <Team id={ id } order={ this.props.selectedTeams.indexOf(id) } onItemClicked={ (e) => this.onTeamClicked(id) }/>) }
            </div>
        )
    }

    onTeamClicked (id) {
        this.props.onTeamClicked(id)
    }
}
