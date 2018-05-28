import React from 'react'
import GameHelper from '../data/GameHelper'
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

    generatePouleMembers (poule) {
        let html = []
        poule.forEach(id => {
            html.push(<div className="poule-pays-name">{ GameHelper.getCountry(id) }</div>)
        })

        return html;
    }

    generateGroup (groupKey) {
        let poule = GameHelper.getPoule(groupKey)
        return (
            <div className="poule-group">
                <div className="poule-title">GROUPE {groupKey}</div>
                { this.generatePouleMembers(poule) }
            </div>
        );
    }

    generateGroupRow (groupKeys) {
        return (<div className="poule-groupes">{ groupKeys.map(id => this.generateGroup(id)) }</div>)
    }

    generateGroups () {
        let poules = GameHelper.getPoules()
        return this.generateGroupRow(Object.keys(poules))
    }
}
