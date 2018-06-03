import React from 'react'
import GameHelper from '../data/GameHelper'
import Constants from '../data/Constants'
import Poules from './Poules'
import FinaleGroups from './FinaleGroups'

import '../../assets/css/BetPage.css'

export default class BetPage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            finales: GameHelper.getFinaleGroups()
        }
    }

    render () {
        const bets = GameHelper.getBets()
        return (
            <div className='cmBetPage'>
                <div className='cmPoulesTitle'>
                    { this.renderSubmitButton() }
                </div>
                <div className="cmBetGroups">
                    <span className="cmGroupSeparator"><i className="fas fa-futbol"></i>Qualification</span>
                    <Poules bets={ GameHelper.getGroupBets() } onGroupSelectionChanged={ selection => this.onGroupSelectionChanged(selection) }/>
                    <span className="cmGroupSeparator"><i className="fas fa-futbol"></i>Finales</span>
                    <FinaleGroups finales={ this.state.finales } bets={ bets } onFinaleSelectionChanged={ (finale, selection) => this.onFinaleSelectionChanged(finale, selection)} />
                </div>
            </div>
        )
    }

    renderSubmitButton () {
        const submitVisible = GameHelper.isSubmitAllowed()
        if (!submitVisible) {
            return null
        }

        const completed = GameHelper.isBetsCompleted()
        return (
            <div className="cmSubmitButtonDiv">
                { !completed ? <span className="cmBetNotCompleted"><i className="fas fa-info-circle"></i>&nbsp;Tous les paris n'ont pas ete saisi</span> : null }
                <button className='cmButton cmSubmitButton' onClick={ () => this.onSubmit() }><i className='fas fa-sign-in-alt cmRP05'></i>SUBMIT</button>
            </div>
        )

    }

    onFinaleSelectionChanged (finale, selection) {
        GameHelper.setBet(finale, selection)
        this.setState({ finales: GameHelper.getFinaleGroups() })
    }

    onGroupSelectionChanged (selection) {
        GameHelper.setBet(Constants.BETS.QUALIF, selection)
        this.setState({ finales: GameHelper.getFinaleGroups() })
    }

    
    onSubmit () {
        GameHelper.submitBets().then(result => console.log('Submit: ok')).catch(error => {
            alert(error.response.statusText + '\n' + error.response.data)
        })
    }

}
