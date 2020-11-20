import React, { Component } from 'react';
import {getListOfWorksByFandom} from '../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {WARNINGS, CATEGORIES, RATES} from '../constants'
import { format, parse } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMarsDouble } from '@fortawesome/free-solid-svg-icons'

class WorksByFandom extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.props.getListOfWorksByFandom(params.fandomId)
        console.log('works params', params.fandomId)
    }

    render() {
        console.log('works', this.props.works)
        const {works} = this.props
        return(
            <div>
                <div className='works-by-fandom-container'>
                    {works.map(work => {
                        return (
                            <div key={work.id} className='row'>
                                <div className='col work-card'>
                                    <div>
                                        {work.categories.map(category =>{
                                            return(CATEGORIES[category.name])
                                        })}
                                    </div>
                                    <div className='work-rate' data-toggle="tooltip" data-placement="bottom" title="Tooltip on bottom">
                                        {RATES[work.rating]}
                                    </div>
                                    <div className={work.completed ? 'work-status-finished' : 'work-status-process'}>
                                        {work.completed ? 'Finished' : 'In a process'}
                                    </div>
                                    {/* <div>{work.date_modified.substring(0, 10)}</div> */}
                                    <div className='work-date'>{format(new Date(work.date_modified), 'yyyy-MM-dd')}</div>
                                </div>
                                <div className='col-md work-container'>
                                    <h4 className='work-title'>
                                        <Link to={`/works/${work.id}`}>{work.title}</Link> by <Link to={`/users/${work.user.id}`}>{work.user.username}</Link> 
                                    </h4>

                                    <h6>Fandoms: {work.fandoms.map(fandom => {
                                        return (fandom.name)
                                    }).join(', ')}</h6>
                                    <div className='work-description'>{work.description}</div>

                                    <p> Relationships and characters: &nbsp;
                                        {work.relationships.map(relationship => {
                                            return (<span className='badge relationship-and-character-tag'>{relationship.name}</span>)
                                        })} &nbsp;
                                        {work.characters.map(character => {
                                            return(<span className='badge relationship-and-character-tag'>{character.name}</span>)
                                        })}
                                    </p>

                                    <p>Warnings: &nbsp; 
                                        {work.warnings.map(warning =>{
                                            return(<span>{WARNINGS[warning.name]} &nbsp;</span>)
                                        })}
                                    </p>
                                    
                                </div>
                                
                            </div>
                        

                        )
                    })}

                </div>
            </div>
        )
    }
}



function mapStateToProps(state) {
    console.log('======= works', state)
    return {
        works: state.worksByFandom
    }
}

export default connect(mapStateToProps, {getListOfWorksByFandom}) (WorksByFandom);