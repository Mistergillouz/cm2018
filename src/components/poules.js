import React from 'react'
import GameHelper from '../data/GameHelper'
import PouleItem from './PouleItem'
import '../../assets/css/poules.css'

export default class Poules extends React.Component {

    render () {
        return (
            <div>
                <div className="cmTitle">
                    <span className="cmSubtitle">Pari sur les phases de qualifications</span>
                    <button className="cmButton" onClick={ () => this.onSubmit() }>SUBMIT</button>
                </div>

                { this.generateGroups() }
            </div>
        )
    }

    onSubmit () {
        GameHelper.saveGroupBets().then(result => console.log('Submit: ok')).catch(error => {
            alert(error.response.statusText + '\n' + error.response.data)
        })
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
