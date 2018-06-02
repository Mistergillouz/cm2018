import React from 'react'
import GameHelper from '../data/GameHelper'
import '../../assets/css/Team.css'

export default class Team extends React.Component {

    render () {
        let id = this.props.id, selected = this.props.selected
        let clazz = selected ? '' : 'cmTeamGrayed'
        return (
            <div className={ 'cmTeam ' + clazz } onClick={ () => this.onClick() }>
                <img className='cmTeamImage' src={ GameHelper.getImagePath(id) }/>
                <div className='cmTeamName'>{ GameHelper.getCountry(id) }</div>
                <div className='cmTeamSelectMark' >
                    { this.generateVoteResult(selected) }
                </div>
            </div>
        )
    }

    generateVoteResult (selected) {
        if (selected) {
            return <i className='fas fa-check cmTeamSelected'></i>
        }

        return null
    }

    onClick () {
        this.props.onItemClicked(this.props.id)
    }
}
