import React from 'react'
import Team from './Team'
import '../../assets/css/TeamGroup.css'

export default class TeamGroup extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            selection: props.selection
        }
    }
    render () {
        return (
            <div className='cmTeamGroup'>
                <div className='cmTeamGroupTitle'>{ this.props.title }</div>
                { this.props.teams.map(id => <Team id={ id } order={ this.state.selection.indexOf(id) } onItemClicked={ (e) => this.onTeamClicked(id) }/>) }
            </div>
        )
    }

    onTeamClicked (id) {
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
