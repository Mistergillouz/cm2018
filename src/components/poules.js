import React from 'react'
import GameHelper from '../data/GameHelper'
import PouleItem from './PouleItem'
import '../../assets/css/poules.css'

export default class Poules extends React.Component {

    render () {
        return (
            <div>
                COUPE DU MONDE 2018: Composition des groupes
                { this.generateGroups() }
            </div>
        )
    }

    onItemClicked (groupKey, id) {

        GameHelper.setGroupBet(groupKey, id)
        this.forceUpdate()
    }
    
    generateGroups () {
        let groups = GameHelper.getGroups()
        return this.generateGroupRow(Object.keys(groups))
    }
    
    generateGroupRow (groupKeys) {
        return (<div className="poule-groupes">{ groupKeys.map(id => this.generateGroup(id)) }</div>)
    }

    generateGroup (groupKey) {
        const poule = GameHelper.getGroup(groupKey), groupBets = GameHelper.getGroupBets(groupKey)
        return (
            <div className="poule-group">
                <div className="poule-title">GROUPE <strong>{groupKey}</strong></div>
                { poule.map(id => <PouleItem id={ id } order={ groupBets.indexOf(id) } onItemClicked={ (e) => this.onItemClicked(groupKey, e) }/>) }
            </div>
        );
    }


}
