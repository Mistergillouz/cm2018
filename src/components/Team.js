import React from 'react'
import GameHelper from '../data/GameHelper'
import '../../assets/css/Team.scss'

export default class Team extends React.Component {

    render () {
        const id = this.props.id, selected = this.props.selected

        let clazz = [ 'cmTeam' ]
        if (!selected) {
            clazz.push('cmTeamGrayed')
        } 
        if (!this.props.readOnly) {
            clazz.push('cmTeamEnabled')
        }

        return (
            <div className={ clazz.join(' ') } onClick={ () => this.onClick() }>
                <img className='cmTeamImage' src={ GameHelper.getImagePath(id) }/>
                <div className='cmTeamName'>{ GameHelper.getCountry(id) }</div>
                <div className='cmTeamSelectMark' >
                    { this.generateVoteResult(selected) }
                </div>
            </div>
        )
    }

    generateVoteResult (selected) {

        if (this.props.customText) {
            return <span>{ this.props.customText }</span>
        }

        if (selected) {
            return <i className='fas fa-check cmTeamSelected'></i>
        }

        return null
    }

    onClick () {
        if (this.props.onItemClicked) {
            this.props.onItemClicked(this.props.id)
        }
    }
}
