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
        const submitVisible =GameHelper.isSubmitAllowed()
        return (
            <div className='cmBetPage'>
                <div className='cmPoulesTitle'>
                    <span className='cmPoulesSubtitle'>PARIS</span>
                    { submitVisible ? 
                        <button className='cmButton cmSubmitButton' onClick={ () => this.onSubmit() }><i className='fas fa-cloud-upload-alt cmRP05'></i>SUBMIT</button> : null }
                </div>

                <Poules bets={ GameHelper.getGroupBets() } onGroupSelectionChanged={ selection => this.onGroupSelectionChanged(selection) }/>
                <FinaleGroups finales={ this.state.finales } onFinaleSelectionChanged={ (finale, selection) => this.onFinaleSelectionChanged(finale, selection)} />
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
