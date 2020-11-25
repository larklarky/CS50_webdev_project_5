import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {WARNINGS, CATEGORIES, RATES} from '../constants'
import { format, parse } from 'date-fns'
import {getWork} from '../actions'


class Work extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.props.getWork(params.workId)
        console.log('work params', params.workId)
    }

    render() { 
        const {work} = this.props
        if (Object.keys(work).length === 0) {
            // console.log('if work', work)
            return (<div>Something went wrong</div>)
        } 
        console.log('render work1111', work)
        return (
            <div>
                <div className='row work-information-card'>
                    <div>
                        <h3>
                            <Link to={`/works/${work.id}`}>{work.title}</Link> by <Link to={`/users/${work.user.id}`}>{work.user.username}</Link>
                        </h3>
                        <h6>Fandoms: {work.fandoms.map(fandom => {
                                return (fandom.name)}).join(', ')}
                        </h6>
                        <div className={'badge' + ' ' + 'category-badge' + " " + work.categories.map(category =>{
                                return(CATEGORIES[category.name].class)})} >
                            <span>{work.categories.map(category =>{
                                return(CATEGORIES[category.name].smallIcon)})} &nbsp;
                            </span>
                            <span>{work.categories.map(category =>{
                                return(CATEGORIES[category.name].text)})}
                            </span>
                        </div>
                        
                        <span>{RATES[work.rating]}</span>
                        <span className={work.completed ? 'work-status-finished' : 'work-status-process'}>
                            {work.completed ? 'Finished' : 'In a process'}
                        </span>
                    </div>
                    
                </div>

            </div>
        )
    }
}


function mapStateToProps(state) {
    console.log('======= work wwwwww', state)
    return {
        work: state.work
    }
}

export default connect(mapStateToProps, {getWork}) (Work);