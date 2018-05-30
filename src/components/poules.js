import React from 'react'
import GameHelper from '../data/GameHelper'
import Team from './Team'
import '../../assets/css/Poules.css'

export default class Poules extends React.Component {

    render () {
        return (
            <div className="cmPoules">
                <div className="cmTitle">
                    <span className="cmSubtitle">Pari sur les phases de qualifications</span>
                    <button className="cmButton cmSubmitButton" onClick={ () => this.onSubmit() }><i className="fas fa-cloud-upload-alt cmRP05"></i>SUBMIT</button>
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
        return (<div className="cmPouleGroupes">{ groupKeys.map(id => this.generateGroup(id)) }</div>)
    }

    generateGroup (groupKey) {
        const poule = GameHelper.getGroup(groupKey), groupBets = GameHelper.getGroupBets(groupKey)
        return (
            <div className="cmPouleGroup">
                <div className="cmPouleTitle">GROUPE <strong>{groupKey}</strong></div>
                { poule.map(id => <Team id={ id } order={ groupBets.indexOf(id) } onItemClicked={ (e) => this.onItemClicked(groupKey, e) }/>) }
            </div>
        );
    }


}
