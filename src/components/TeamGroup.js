import React from 'react'
import Team from './Team'
import '../../assets/css/TeamGroup.css'

export default class TeamGroup extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            selection: props.selection || []
        }
    }
    render () {

        const warningVisible = (this.state.selection.length !== this.props.selectionCount) && !this.props.readOnly
        return (
            <div className='cmTeamGroup'>
                <div className='cmTeamGroupTitle'>
                    <span>{ this.props.title }</span>
                    { warningVisible ? <i className="fas fa-exclamation-triangle cmTeamWarningIcon" title="Tous les matchs de ce groupe n'ont pas ete saisis"></i> : null }
                </div>
                { this.props.teams.map(id => this.generateTeam(id)) }
            </div>
        )
    }

    generateTeam (id) {
        const selected = this.state.selection.indexOf(id) !== -1
        return <Team id={ id } selected={ selected } onItemClicked={ (e) => this.onTeamClicked(id) }/>
    }

    onTeamClicked (id) {

        if (this.props.readOnly) {
            return
        }

        let selection = this.state.selection.slice()
        
        const index = selection.indexOf(id)
        if (index !== -1) {
            selection.splice(index, 1)
        } else {
            selection.push(id)
        }

        if (selection.length > this.props.selectionCount) {
            selection.splice(0, selection.length - this.props.selectionCount)
        }

        this.setState({ selection })
        this.props.onSelectionChanged(selection)
    }
}
