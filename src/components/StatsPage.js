import React from 'react'
import GameHelper from '../data/GameHelper'
import Constants from '../data/Constants'
import FinaleGroups from './FinaleGroups'
import Team from './Team'
import Popup from './Popup'

import '../../assets/css/StatsPage.scss'

export default class StatsPage extends React.Component {

    constructor (props) {
        super(props)

        this.state = {}
        this.popup = null

        GameHelper.loadResults().then(requestData => this.setState({ 
            stats: requestData.data
        }))
    }

    render () {
        return (
            <div className='cmStatsPage'>
                <div className='cmStatsPageContainer'>
                    <div className='cmStatsPageHeader'>STATS: CUMUL DES VOTES</div>
                    { this.generateCumulStatsTable(this.state.stats, 'counts') }
                </div>
                <Popup ref="popup" key="popup"/>
            </div>
        )
    }

    generateCumulStatsTable(statDatas, statKey) {
        if (!statDatas) {
            return null
        }

        const statData = statDatas.stats[statKey], results = statDatas.results
        const phaseKeys = Object.keys(Constants.BETS)
        return (
            <div className="cmStatTables">
                { Object.keys(statData).map((phase, index) => {
                    const stats = statData[phase], phaseResults = results[phaseKeys[index]] || []
                    const keys = Object.keys(stats).sort((a, b) => stats[b].length - stats[a].length)
                    return (
                        <div className="cmStatTable"><span className="cmStatHeader">{ Constants.BETS[phase].title }</span>
                            <div className="cmStatRows">
                                 { keys.map(country => this.generateRow(country, stats[country].length, phaseResults.indexOf(country) !== -1)) }
                            </div>
                        </div>
                    )
                }) 
                }
            </div>
        )
    }

    generateRow(country, text, selected) {
        return <Team id={ country } selected={ selected } customText={ text } onItemClicked={ () => this.onTeamClick() }/>
    }

    onTeamClick() {
        this.refs.popup.show()
    }
}



