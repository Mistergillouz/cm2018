import React from 'react'

import GameHelper from '../data/GameHelper'
import Constants from '../data/Constants'

import '../../assets/css/EnterResultsPage.scss'

export default class EnterResultsPage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {}
        GameHelper.loadResults().then(requestData => this.setState({ 
            results: requestData.data.results || {}
        }))
    }
    render () {

        if (!this.state.results) {
            return null
        }

        return (
            <div className='cmEnterResultsPage'>
                <div className="cmEnterResultsTitle">
                    <button className="cmButton" onClick={ () => this.onSubmit() }>SUBMIT</button>
                    <span className="cmEnterResultsTextBanner"><i className="fas fa-tasks"></i>Saisie des résultats</span>
                </div>
                <div className="cmEnterResultsPhases">
                { EnterResultsPage.PHASES.map((phase, index) => this.generatePhasePanel(index)) }
                </div>
            </div>
        )
    }

    generatePhasePanel(index) {
        const phaseInfos = EnterResultsPage.PHASES[index]
        let countries = [], isValidPhase = true
        if (index === 0) {
            countries = Object.keys(Constants.COUNTRIES)
        } else {
            const prevPhase = EnterResultsPage.PHASES[index - 1]
            countries = this.getResults(this.state.results, prevPhase.key)
            isValidPhase = (countries.length === Constants.PHASES[prevPhase.key].selectionCount)
        }
        
        return (
            <div className="cmEnterResultsPhase">
                <span className='cmEnterResultPhaseName'>{ phaseInfos.title }</span>
                { this.generatePhaseResults(phaseInfos.key, countries, isValidPhase)}
            </div>
        )
    }

    generatePhaseResults(phaseId, countries, isValidPhase) {
        
        const results = this.getResults(this.state.results, phaseId)
        const optionsCountries = [EnterResultsPage.EMPTY_COUNTRY].concat(countries.slice().sort())
        
        let rows = []
        for (let countryIndex = 0; countryIndex < Constants.PHASES[phaseId].selectionCount; countryIndex++) {
            const selection = results[countryIndex] || EnterResultsPage.EMPTY_COUNTRY
            rows.push(
                <select disabled={ !isValidPhase } className="cmEnterResultsSelect" onChange={ e => this.onChange(phaseId, e.target.value, countryIndex) } value={ selection }>
                { optionsCountries.map(id => <option value={ id }>{ this.getCountryName(id) }</option> )}
                </select>)
        }

        return rows
    }

    onChange(phaseId, countryId, index) {
        const stateResults = JSON.parse(JSON.stringify(this.state.results))
        const results = this.getResults(stateResults, phaseId)
        if (countryId === EnterResultsPage.EMPTY_COUNTRY) {
            results.splice(index, 1)
        } else if (results.indexOf(countryId) === -1) {
            if (results[index]) {
                results[index] = countryId
            } else {
                results.push(countryId)
            }
        }
        
        this.setState({ results: stateResults })
        console.log(phaseId, countryId)
    }
    onSubmit () {
        GameHelper.submitResults(this.state.results)
            .then(result => alert('Results was successfully updated'))
            .catch(error => alert('An error happens while updating results:' + error))
    }

    getCountryName(id) {
        return (id === EnterResultsPage.EMPTY_COUNTRY) ? 'Select a country...' : Constants.COUNTRIES[id]
    }

    getResults(results, id) {
        if (!results[id]) {
            results[id] = []
        }
        return results[id]
    }
}

EnterResultsPage.EMPTY_COUNTRY = 'empty'
EnterResultsPage.PHASES = [ Constants.PHASES.QUALIF, Constants.PHASES.HUITIEME, Constants.PHASES.QUART, Constants.PHASES.DEMI, Constants.PHASES.FINALE ]

        