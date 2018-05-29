import React from 'react'
import GameHelper from '../data/GameHelper'

export default class PouleItem extends React.Component {

    render () {
        let id = this.props.id
        return (
            <div className="poule-group-item" onClick={ () => this.onClick() }>
                <img className="poule-pays-image" src={ GameHelper.getImagePath(id) }/>
                <div className="poule-pays-name">{ GameHelper.getCountry(id) }</div>
                <div className="poule-pays-order">
                    { this.generateVoteResult() }
                </div>
            </div>
        )
    }

    generateVoteResult () {
        const order = this.props.order, result = this.props.result
        if (order === -1) {
            return <i className="far fa-hand-point-up"></i>
        }

        return <strong>{ order + 1 }</strong>
    }

    onClick () {
        this.props.onItemClicked(this.props.id)
    }
}
