import React from 'react'
import GameHelper from '../data/GameHelper'
import Poules from './Poules'
import Finales from './Finales'

export default class MainPage extends React.Component {

    render () {
        return (
            <div>
                <Poules submitVisible={ GameHelper.isSubmitAllowed() } onTeamClicked={ (groupKey, id) => this.onTeamClicked(groupKey, id) }/>
                <Finales/>
            </div>
        )
    }

    onTeamClicked (groupKey, id) {
        GameHelper.setGroupBet(groupKey, id)
        this.setState({ refresh: true })
    }

}
