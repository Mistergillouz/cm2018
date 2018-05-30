import React from 'react'
import GameHelper from '../data/GameHelper'
import '../../assets/css/Team.css'

export default class Team extends React.Component {

    render () {
        let id = this.props.id, order = this.props.order
        let clazz = order === -1 ? 'cmTeamGrayed' : ''
        return (
            <div className={ "cmTeam " + clazz } onClick={ () => this.onClick() }>
                <img className="cmTeamImage" src={ GameHelper.getImagePath(id) }/>
                <div className="cmTeamName">{ GameHelper.getCountry(id) }</div>
                <div className="cmTeamSelectMark" >
                    { this.generateVoteResult(order) }
                </div>
            </div>
        )
    }

    generateVoteResult (order) {
        if (order !== -1) {
            return <i className="fas fa-check cmTeamSelected"></i>
        }

        return null
    }

    onClick () {
        this.props.onItemClicked(this.props.id)
    }
}
