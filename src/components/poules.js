import React from 'react'
import GameHelper from '../data/GameHelper'
import TeamGroup from './TeamGroup'

import '../../assets/css/Poules.css'

export default class Poules extends React.Component {

    render () {
        const submitVisible = this.props.submitVisible
        return (
            <div className="cmPoules">
            
                <div className="cmPouleTitle">
                    <span className="cmPouleSubtitle">Pari sur les phases de qualifications</span>
                    { submitVisible ? 
                        <button className="cmButton cmSubmitButton" onClick={ () => this.onSubmit() }><i className="fas fa-cloud-upload-alt cmRP05"></i>SUBMIT</button> : null }
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

    onTeamClicked (groupKey, id) {
        this.props.onTeamClicked(groupKey, id)
    }
    
    generateGroups () {
        let groups = GameHelper.getGroups()
        return this.generateGroupRow(Object.keys(groups))
    }
    
    generateGroupRow (groupKeys) {
        return (<div className="cmPouleGroups">{ groupKeys.map(id => this.generateGroup(id)) }</div>)
    }

    generateGroup (groupKey) {
        const poule = GameHelper.getGroup(groupKey), groupBets = GameHelper.getGroupBets(groupKey)
        return <TeamGroup 
            title={ 'GROUPE ' + groupKey }
            teams={ poule } 
            selectedTeams={ groupBets }
            onTeamClicked={ id => this.onTeamClicked(groupKey, id) }
        />
    }


}
